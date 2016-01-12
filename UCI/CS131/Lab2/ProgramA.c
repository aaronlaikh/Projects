#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "mpi.h"

char *array;
int slice_indexes[1024] = {0};
int slice_len = 0;
int NT = 0;
int NS = 0;
int line_count = 0;
char search_str[15];
char* space = "               ";

/*append string in line to string in array_slot*/
void copy_to_str(char* array_slot, char* line)
{
	strcat(array_slot, line);
}
/*allocate an array and read the input file.
 * This fills in the string to search for,
 * NT (# threads), and NS(# slices), the latter 2
 * of which are not used in this implementation for
 * MPI. Remaining lines fill the aray with words.*/
void read_input(char* file)
{
	array = malloc(100000 * 15 * sizeof(char));
	memset(array, '\0', 100000 * 15);
	FILE* fd = fopen(file, "r");
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
			int len = strlen(line);
			char temp[15];
			strcpy(temp, line);
			strncat(temp, space, 15-len);
			copy_to_str(array, temp);
			line_count++;
		}
	}
	fclose(fd);
}

/*Prints the input array.  Used for testing.*/
void print_array()
{
	int i = 0;
	for (i < 0; i < line_count - 3; i++)
		printf("%s\n", array[i]);
}

/*clear the output file of its current data.*/
void clear_output(char* file)
{
	FILE* ofp = fopen(file, "w");
	fclose(ofp);
}

/*After gathering results, write to an output file.*/
void write_to_output(char* file, int* foundArr, int num_th, double time)
{
	int slice = -1;
	char *found = "no";
	clear_output(file);
	FILE* ofp = fopen(file, "w");
	int i = 0;
	for (i = 0; i < num_th; i++)
	{
		if (foundArr[i] > 0){
			slice = i;
			found = "yes";
		}
		fprintf(ofp, "thread %d, found %s, slice %d, position %d\n", i, found, slice, foundArr[i]);
		slice = -1;
		found = "no";
	}
	fprintf(ofp, "%g\n", time*1000);
	fclose(ofp);
}
/*Compares temp to search_str, one character at a time.
 * Returns 1 if match, 0 if not match. Because words in
 * textBuffer are padded with spaces to 15char, this
 * function only searches the length of search_str and
 * searches for a perfect match.  However, it will give
 * false positives for suffixes
 * ie. temp = springster, search_str = spring*/
int my_compare(char* temp, char* search_str)
{
	int len = strlen(search_str);
	int i = 0;
	for (i = 0; i < len; i++)
	{
		if (search_str[i] != temp[i])
			return 0;
	}
	return 1;
}
/*Search through the portion given to a processor for search_str.
 * Returns -1 if exact match not found, and word index if found.*/
int search_for_string(char* textBuffer, char* search_str)
{
	int found = -1;
	int track = 0;
	int index = 0;
	char temp[15];
	while(track < 25000*15)
	{
		memset(temp, '\0', 15);
		strncpy(temp, textBuffer, 15);
		textBuffer += 15;
		track += 15;
		index++;
		if (my_compare(temp, search_str))
		{
			found = index;
			break;
		}
	}
	return found;
}

int main(int argc, char* argv[])
{
	int th_id;
	int num_th;
	int portion;
	double  start, end;
	int* foundArr;
	char* relative_path_to_input_file;
	char* relative_path_to_output_file;

	relative_path_to_input_file = argv[1];
	relative_path_to_output_file=argv[2];

	/* Set up Datatype of 15 MPI_CHAR
 * begin MPI*/	
	MPI_Datatype stringtype;	
	MPI_Init(&argc, &argv);
	MPI_Comm_rank(MPI_COMM_WORLD, &th_id);
	MPI_Comm_size(MPI_COMM_WORLD, &num_th);
	
	MPI_Type_contiguous(15, MPI_CHAR, &stringtype);
	MPI_Type_commit(&stringtype);


	/*If master task, read input file.*/
	if (th_id == 0)
	{
		start = MPI_Wtime();
		read_input(relative_path_to_input_file);
	}
	/*Broadcast string to search and portion size of array*/
	portion = (line_count - 3)/num_th;
	MPI_Bcast(search_str, 15, MPI_CHAR, 0, MPI_COMM_WORLD);
	MPI_Bcast(&portion, 1, MPI_INT, 0, MPI_COMM_WORLD);

	/*Scatter array to all threads, search each portion for search_str
 * If found, get global index of the number*/
	char textBuffer[portion*15];
	MPI_Scatter(array, portion, stringtype, textBuffer, portion, stringtype, 0, MPI_COMM_WORLD);	
	int found = search_for_string(textBuffer, search_str);
	if (found > 0)
		found += (th_id * 25000);

	/* Gather results from threads to master*/
	if (th_id == 0)
	{
		foundArr = malloc(sizeof(int) * num_th);
	}
	MPI_Gather(&found, 1, MPI_INT, foundArr, 1, MPI_INT, 0, MPI_COMM_WORLD);
	if (th_id == 0)
	{
		end = MPI_Wtime();
		write_to_output(relative_path_to_output_file, foundArr, num_th, end-start);
	}
	/*Free MPI type and malloc'd arrays*/
	MPI_Type_free(&stringtype);
	if (th_id == 0){
		free(array);
		free(foundArr);
	}
	MPI_Finalize();
	return 0;
}
