#!/bin/bash
#
#$ -cwd
##$ -j y
#$ -S /bin/bash
#$ -M laiak@uci.edu
#$ -pe openmpi 4
#$ -i input_partA.txt
#$ -o OutA.txt
#$ -e OutA.err


#Use modules to set up the runtime environment

module load sge
module load openmpi/1.6

mpirun -np $NSLOTS ./ProgramA.c
