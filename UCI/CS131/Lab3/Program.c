#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "omp.h"

char str_list[100000][15];
char search_str[15];

/* Reads the input file at filename to get initial
 * parameters and fills the string array.
 * The first lines, NT and NS, are ignored.*/
void read_input_to_prog(char* filename)
{
	FILE* ifp = fopen(filename, "r");
	char line[15] = {'\0'};
	int index = 0;
	while (fscanf(ifp,"%s\n", line) >0)
	{
		switch (index++)
		{
			case 0:
				break;
			case 1:
				break;
			case 2:
				strcpy(search_str, line);
				break;
			default:
				strcpy(str_list[index-4], line);
				memset(line, '\0', 15);
				break;
		}
	}
	fclose(ifp);
}

/* Prints the found string to the output file at filename.
 * This function is tailored for part B and does not include
 * the slice index.*/
void print_found_B(int th_id, int found_it, int global_index, char* filename)
{
	char* found = "no";
	if (found_it == 1)
		found = "yes";
	FILE* ofp = fopen(filename, "a");
	fprintf(ofp, "%d, found %s, %d\n", th_id, found, global_index);
	fclose(ofp);
}

/* Prints the found string to the output file at filename.
 * This function is tailored for part A and includes
 * the slice index.*/
void print_found_A(int th_id, int found_it, int slice_index, int global_index, char* filename)
{
	char* found = "no";
	if (found_it == 1)
		found = "yes";
	FILE* ofp = fopen(filename, "a");
	fprintf(ofp, "%d, found %s, %d, %d\n", th_id, found, slice_index, global_index);
	fclose(ofp);
}

/* Compares current entry in the array of strings to the
 * string being searched for.  If matched, found flag
 * set to 1, and result printed to output file.
 * This function uses a parameter "part" to distinguish
 * between Part A and Part B.*/
void compare_str(int index, int th_id, int* found_it, int slice_index, char* filename, char part)
{
	if (strcmp(search_str, str_list[index]) == 0) {
		*found_it = 1;
		if (part == 'A')
			print_found_A(th_id, *found_it, slice_index, index, filename);
		else if (part == 'B')
			print_found_B(th_id, *found_it, index, filename);
	}
}

/* If the string cannot be found in the list, this function
 * is run. */
void fail_to_find(int found_it, char* filename, char part)
{
	if (found_it == 0)
	{
		if (part == 'A')
			print_found_A(-1, 0, -1, -1, filename);
		else if (part == 'B')
			print_found_B(-1, 0, -1, filename);
	}
}


/* Used to clear the contents of output file filename,
 * if it already exists.
 * */
void clear_output_file(char* filename)
{
	FILE* ofp = fopen(filename, "w");
	fclose(ofp);
}

/* Begin OpenMP dynamic scheduling.
 * Sets chunk_size to chunks.  Has no need for slice index
 * due to the dynamic scheduling.
 * */
void begin_dynamic_omp(int chunks, char* relative_path_to_output)
{
	int th_id;
	int found_it = 0;
 	#pragma omp parallel for schedule(dynamic, chunks) shared (str_list, chunks, found_it) private(th_id)
	for (int i = 0; i < 100000; i++)
	{	
		th_id = omp_get_thread_num();
		compare_str(i, th_id, &found_it, -1, relative_path_to_output, 'B');
	}
	fail_to_find(found_it, relative_path_to_output, 'B');
}


/* Begin OpenMP static scheduling.
 * Sets chunk_size to chunks and tracks slice_index for each thread.
 * Slice_index is dec by 1 when comparing because it starts from 1,
 * as 0%n, n%n, etc will increment the first slice index to 1.
 * */
void begin_static_omp(int chunks, char* relative_path_to_output)
{
	int slice_index=0;
	int th_id;
	int found_it = 0;
 	#pragma omp parallel for schedule(static, chunks) shared (str_list, chunks, found_it) private(th_id, slice_index)
	for (int i = 0; i < 100000; i++)
	{	
		th_id = omp_get_thread_num();
		if (i%chunks ==  0)
			slice_index++;
		compare_str(i, th_id, &found_it, slice_index-1, relative_path_to_output, 'A');
	}
	fail_to_find(found_it, relative_path_to_output, 'A');
}

/*Get the arguments for input file, output file, number of threads,
 * and chunk size.  Run static scheduling function for part A, then
 * dynamic scheduling function for part B.*/
int main(int argc, char* argv[])
{
	char* relative_path_to_input;
	char* relative_path_to_output;
	int num_threads;
	int num_chunks;

	relative_path_to_input = argv[1];
	relative_path_to_output = argv[2];
	num_threads = atoi(argv[3]);
	num_chunks = atoi(argv[4]);

	read_input_to_prog(relative_path_to_input);
	clear_output_file(relative_path_to_output);

	//Part A, static scheduling
	omp_set_num_threads(num_threads);
	
	begin_static_omp(num_chunks, relative_path_to_output);
	begin_dynamic_omp(num_chunks, relative_path_to_output);
	return 0;
}
