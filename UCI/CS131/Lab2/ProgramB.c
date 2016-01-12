#include "mpi.h"
#include <stdio.h>


void my_barrier()
{
	int th_id, recv_id, num_th, resp, ack;
	MPI_Comm_rank(MPI_COMM_WORLD, &th_id);
	MPI_Comm_size(MPI_COMM_WORLD, &num_th);
	MPI_Status status;
	if (th_id > 0)
	{
		ack = MPI_Send(&th_id, 1, MPI_INT, 0, 0, MPI_COMM_WORLD);
		resp = MPI_Recv(NULL, 0, MPI_BYTE, 0, 1, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
	}
	else if (th_id == 0)
	{
		int i = 0;
		for (i = 1; i < num_th; i++)
		{
			ack = MPI_Recv(&recv_id, 1, MPI_INT, i, 0, MPI_COMM_WORLD, MPI_STATUS_IGNORE);
			
		}
		for (i = 1; i < num_th; i++)
		{
			resp = MPI_Send(NULL, 0, MPI_BYTE, i, 1, MPI_COMM_WORLD);
		}
	}
}

void clear_file(char* file)
{
	FILE *ofp = fopen(file, "w");
	fclose(ofp);
}

void write_to_file(char* file, double time)
{
	clear_file(file);
	FILE *ofp = fopen(file, "w");
	fprintf(ofp, "%g\n", time*1000);
	fclose(ofp);
}

int main(int argc, char* argv[])
{
	int argc;
	char* argv;
	
	int num_th, th_id;
	
	char* relative_path_to_output_file;
	
	double start, time;
	relative_path_to_output_file = argv[1];
	
	MPI_Init(&argc, &argv);
	MPI_Comm_rank(MPI_COMM_WORLD, &th_id);
	MPI_Comm_size(MPI_COMM_WORLD, &num_th);

	if (th_id == 0)
		start = MPI_Wtime();

	my_barrier();	

	if (th_id == 0)
	{
		time = MPI_Wtime() - start;
		write_to_file(relative_path_to_output_file, time);
	}
	MPI_Finalize();
	return 0;
}
