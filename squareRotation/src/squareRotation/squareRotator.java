package squareRotation;

import java.util.ArrayList;
import java.io.*;
import java.util.Scanner;

public class squareRotator {
	
	/***
	 * 
	 * Takes a given size and returns the integer representation of the square root.
	 * @param size
	 * @return sqrt;
	 */
	private static int getSqRt(int size)
	{
		int sqrt = (int) Math.sqrt(size);
		return sqrt;
	}
	
	/***
	 * 
	 * Reads the input file and adds each token to the ArrayList.  Returns ArrayList.
	 * 
	 * ASSUMPTIONS:
	 * 	*The items in the file are space-delimited.
	 * 	*There are an even-square amount of items in the file (ie 1, 4, 9, 16, etc.)
	 * @param input
	 * @return letters
	 */
	public static ArrayList<String> parseFile(File input)
	{
		try{
			Scanner in = new Scanner(input);
			ArrayList<String> letters = new ArrayList<String>();
			while (in.hasNext())
			{
				letters.add(in.next());
			}
			in.close();
			return letters;
		}
		catch (FileNotFoundException e)
		{
			e.printStackTrace();
		}
		return null;
	}
	
	/***
	 * 
	 * Takes an ArrayList populated with letters and rotates the square of letters.
	 * The rotation is 90 degrees clockwise.
	 * The square is then printed to console. 
	 * 
	 * ASSUMPTION:
	 * A B C D		M I E A
	 * E F G H	->	N J F B
	 * I J K L		O K G C
	 * M N O P		P L H D
	 * 
	 * This algorithm runs in O(n^2) time as a naive implementation.
	 *
	 * @param letters
	 */
	public static void rotateSquare(ArrayList<String> letters)
	{
		int letterIndex = 0;
		int squareLen = getSqRt(letters.size());
		String[][] squareArray = new String[squareLen][squareLen];
		for (int i = squareLen-1; i >= 0; i--)
		{
			for (int j = 0; j < squareLen; j++)
			{
				squareArray[j][i] = letters.get(letterIndex++);
			}
		}
		printSquare(squareArray, squareLen);
	}
	/***
	 * 
	 * Prints the rotated square to the console.
	 * @param squareArray
	 * @param squareLen
	 */
	public static void printSquare(String[][] squareArray, int squareLen)
	{
		for (int k = 0; k < squareLen; k++)
		{	
			for (int l = 0; l < squareLen; l++)
				System.out.print(squareArray[k][l] + " ");
			System.out.println();
		}
	}
	
	public static void main(String[] args)
	{
		File input = new File(args[0]);
		ArrayList<String> letters = parseFile(input);
		rotateSquare(letters);
	}
}
