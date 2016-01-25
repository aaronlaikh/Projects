package ir.assignments.two.a;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 * A collection of utility methods for text processing.
 */
public class Utilities {
	/**
	 * Reads the input text file and splits it into alphanumeric tokens.
	 * Returns an ArrayList of these tokens, ordered according to their
	 * occurrence in the original text file.
	 * 
	 * Non-alphanumeric characters delineate tokens, and are discarded.
	 *
	 * Words are also normalized to lower case. 
	 * 
	 * Example:
	 * 
	 * Given this input string
	 * "An input string, this is! (or is it?)"
	 * 
	 * The output list of strings should be
	 * ["an", "input", "string", "this", "is", "or", "is", "it"]
	 * 
	 * @param input The file to read in and tokenize.
	 * @return The list of tokens (words) from the input file, ordered by occurrence.
	 */
    private static Scanner scn;
	 public static ArrayList<String> tokenizeFile(File input) {
      ArrayList<String> tokens = new ArrayList<String>();
      try
      {
         scn = new Scanner(input);
         while (scn.hasNext())
         {
            String currentToken = scn.next();
            if (alphaNumeric(currentToken))
               tokens.add(currentToken);
         }
         return tokens;
      }
      catch (Exception e)
      {
         System.err.println("Failed to open file.");
      }
   	return tokens;
	}
	
	/**
	 * Takes a list of {@link Frequency}s and prints it to standard out. It also
	 * prints out the total number of items, and the total number of unique items.
	 * 
	 * Example one:
	 * 
	 * Given the input list of word frequencies
	 * ["sentence:2", "the:1", "this:1", "repeats:1",  "word:1"]
	 * 
	 * The following should be printed to standard out
	 * 
	 * Total item count: 6
	 * Unique item count: 5
	 * 
	 * sentence	2
	 * the		1
	 * this		1
	 * repeats	1
	 * word		1
	 * 
	 * 
	 * Example two:
	 * 
	 * Given the input list of 2-gram frequencies
	 * ["you think:2", "how you:1", "know how:1", "think you:1", "you know:1"]
	 * 
	 * The following should be printed to standard out
	 * 
	 * Total 2-gram count: 6
	 * Unique 2-gram count: 5
	 * 
	 * you think	2
	 * how you		1
	 * know how		1
	 * think you	1
	 * you know		1
	 * 
	 * @param frequencies A list of frequencies.
	 */
	public static void printFrequencies(List<Frequency> frequencies) {
      int freqSum = 0;
      for (int j = 0; j < frequencies.size(); j++)
         freqSum += frequencies.get(j).getFrequency();
      System.out.println("Total item count: " + freqSum);
      System.out.println("Unique item count: " + frequencies.size() + "\n");
		for (int i = 0; i < frequencies.size(); i++)
      {
         System.out.println(String.format("%-36s%d", frequencies.get(i).getText(), frequencies.get(i).getFrequency()));
      }
	}
   
   /*
      Checks if given string contains only alphanumeric characters. (0-9, a-z, A-Z).
      Returns true if only alphanumeric. Else, false.
   */
   private static boolean alphaNumeric(String token){
      for (int i = 0; i < token.length(); i++)
      {
         char c = token.charAt(i);
         if (c < '0' || (c > '0' && c <= '@') || (c > 'Z' && c <= '`') || (c > 'z'))
            return false;
      }
      return true;
   }
   
   public static void main(String[] args)
   {
      try
      {
         File input = new File(args[0]);
         ArrayList<String> tokens = tokenizeFile(input);
         List<Frequency> frequencies = new ArrayList<Frequency>();
         for (int i = 0; i < tokens.size(); i++)
         {
            frequencies.add(new Frequency(tokens.get(i), i));
         }
         printFrequencies(frequencies);
      }
      catch (Exception e)
      {
         System.err.println("File not found.");
      }
   }
}
