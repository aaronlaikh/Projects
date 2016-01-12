#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <pthread.h>
#include <unistd.h>

char array[100000][15] = {"\0"};
int slice_indexes[1024] = {0};
int slice_len = 0;
int NT = 0;
int NS = 0;
int line_count = 0;
char search_str[15];
int SV = 0;


/* Copy the string in line to the memory location
 * in array_slot.  Used to fill the array.*/
void copy_to_str(char* array_slot, char* line)
{
	memset(array_slot, '\0', 15);
	strcpy(array_slot, line);
}

/*Read the input file at input_partB.txt.
 * This determines NS, NT, search_str, and the
 * words in the array, as well as the number
 * of words in the file.*/
void read_input()
{
	FILE* fd = fopen("input_partB.txt", "r");
	if (fd < 0)
		fprintf(stderr, "error opening file");
	char line[15];
	int i = 0;
	while (fscanf(fd, "%s", line) > 0)
	{
		if (line_count == 0)
		{
			NT = atoi(line);
			line_count++;
		}
		else if (line_count == 1)
		{
			NS = atoi(line);
			line_count++;
		}
		else if (line_count == 2)
		{
			copy_to_str(search_str, line);
			line_count++;
		}
		else
		{
			copy_to_str(array[i++], line);
			line_count++;
		}
	}
	fclose(fd);
}

/* Prints the words in the array.  Used only for
 * testing. */
void print_array()
{
	int i = 0;
	for (i < 0; i < line_count - 3; i++)
		printf("%s\n", array[i]);
}

/* Write to the output file ofp. Used by each thread.*/
void write_to_output(FILE* ofp, int threadid, int slice_id, int found, int pos_index)
{
	int sliced = -1;
	int p_index = -1;
	char* found_it = "no";
	if (found)
	{
		found_it = "yes";
		sliced = slice_id;
		p_index = pos_index;
	}
	fprintf(ofp, "thread %d,\tfound %s,\tslice %d,\tposition %d\n", threadid, found_it, sliced, p_index);
}

/*Searches a slice (given by SV) for search_str, then
 * outputs to file OutB.txt at the end of the search.
 * If there are more slices to search, it continues.
 * Otherwise, the thread exits.*/
void *search_slice(void* tid)
{
	int threadid = (intptr_t)tid;
	int slice = SV;
	SV++;
	int j = slice_indexes[slice]- (slice_len-1);
	int found = 0; int the_index = 0;
	while (j <= slice_indexes[slice])
	{
		if (strcmp(array[j], search_str) == 0)
		{
			found = 1;
			the_index = j;			
		}
		j++;
	}
	FILE* ofp = fopen("OutB.txt", "a");
	write_to_output(ofp, threadid, slice, found, the_index);
	fclose(ofp);
	if (SV >= NS)
	{
		pthread_exit(NULL);
	}
	else
	{
		search_slice(tid);
	}
}

void clear_output()
{
	FILE* ofp = fopen("OutB.txt", "w");
	fclose(ofp);
}

/*Begins threading the program to search.  After creating
 * threads, waits for all threads to finish.*/
void begin_threading()
{
	pthread_t threads[NT];
	clear_output();
	int i = 0, rc;
	for (i = 0; i < NT; i++)
	{
		if (rc = pthread_create(&threads[i], NULL, &search_slice, (void *)(intptr_t)i))
		{
			fprintf(stderr, "return from pthread_create() is %d\n", rc);
			exit(-1);
		}
	}
	for (i = 0; i < NT; i++)
	{
		pthread_join(threads[i], NULL);
	}
}

/* Slices array by determining ending indexes.
 * Places in another array slice_indexes to be
 * called by the threads to determine slices.*/
void slice_array()
{
	int count = line_count -3;
	slice_len = count/NS;
	int i = 0;
	for (i = 0; i < NS; i++)
	{
		slice_indexes[i] = slice_len*(i+1)-1;
	}
	begin_threading();

}

int main()
{
	read_input();
	slice_array();
	return 0;
}
