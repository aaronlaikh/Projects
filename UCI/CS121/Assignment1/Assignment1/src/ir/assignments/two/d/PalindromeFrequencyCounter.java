package ir.assignments.two.d;

import ir.assignments.two.a.Frequency;
import ir.assignments.two.a.Utilities;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class PalindromeFrequencyCounter {
	/**
	 * This class should not be instantiated.
	 */
	private PalindromeFrequencyCounter() {}
	
	/**
	 * Takes the input list of words and processes it, returning a list
	 * of {@link Frequency}s.
	 * 
	 * This method expects a list of lowercase alphanumeric strings.
	 * If the input list is null, an empty list is returned.
	 * 
	 * There is one frequency in the output list for every 
	 * unique palindrome found in the original list. The frequency of each palindrome
	 * is equal to the number of times that palindrome occurs in the original list.
	 * 
	 * Palindromes can span sequential words in the input list.
	 * 
	 * The returned list is ordered by decreasing size, with tied palindromes sorted
	 * by frequency and further tied palindromes sorted alphabetically. 
	 * 
	 * The original list is not modified.
	 * 
	 * Example:
	 * 
	 * Given the input list of strings 
	 * ["do", "geese", "see", "god", "abba", "bat", "tab"]
	 * 
	 * The output list of palindromes should be 
	 * ["do geese see god:1", "bat tab:1", "abba:1"]
	 *  
	 * @param words A list of words.
	 * @return A list of palindrome frequencies, ordered by decreasing frequency.
	 */
	private static List<Frequency> computePalindromeFrequencies(ArrayList<String> words) {
      List<Frequency> frequencies = new ArrayList<Frequency>();
      for (int i = 0; i < words.size(); i++)
      {
         String conc = words.get(i);
         String space = words.get(i);
         if (isPalindrome(conc))
         {
            int in = strInFreq(space, frequencies);
            if (in >= 0)
               frequencies.get(in).incrementFrequency();
            else
               addToFreq(space, frequencies, 1);
         }
         for (int j = i+1; j < words.size(); j++)
         {
            conc += words.get(j);
            space += " " + words.get(j);
            if (isPalindrome(conc))
            {
               int in = strInFreq(space, frequencies);
               if (in >= 0)
               {
                  frequencies.get(in).incrementFrequency();
                  reorderFreq(in, frequencies);
               }   
               else
                  addToFreq(space, frequencies, 1);
            }
         }
      }
		return frequencies;
	}
	
   /*
      Reorders the list of frequencies by removing the Frequency object at index in
      and readding it in the list at the correct location.
   */
   private static void reorderFreq(int in, List<Frequency> frequencies)
   {
      String word = frequencies.get(in).getText();
      int occurrences = frequencies.get(in).getFrequency();
      frequencies.remove(in);
      addToFreq(word, frequencies, occurrences);
   }
   
   /*
      Adds a new Frequency object at the correct location in the given list of Frequencies.
      Frequency objects are ordered first by word size, then by number of occurrencies (frequency),
      then by alphabetical order (case-insensitive).
   */
   private static void addToFreq(String word, List<Frequency> frequencies, int occurrence)
   {
      int wCount = wordSize(word);
      boolean done = false;
      for (int i = 0; i < frequencies.size(); i++)
      {
         int textWCount = wordSize(frequencies.get(i).getText());
         if (wCount > textWCount)
         {
            frequencies.add(i, new Frequency(word, occurrence));
            done = true;
            break;
         }
         else if (wCount == textWCount)
         {
            if (occurrence > frequencies.get(i).getFrequency())
            {
               frequencies.add(i, new Frequency(word, occurrence));
               done = true;
               break;
            }
            else if (occurrence == frequencies.get(i).getFrequency())
            {
               if (frequencies.get(i).getText().toLowerCase().compareTo(word.toLowerCase()) >= 0)
               {
                  frequencies.add(i, new Frequency(word, occurrence));
                  done = true;
                  break;
               }
            }
         }
      }
      if (!done)
         frequencies.add(new Frequency(word, 1));
   }
   
   /*
      Returns the size of the string word.  Size is determined by
      splitting on the number of spaces between words in the string.
      ie. "bob apple cat" has a size of 3, "asdfjkl" has a size of 1.
   */
   private static int wordSize(String word)
   {
      String[] splitted = word.split(" ");
      return splitted.length;
   }
   
   /*
      Checks if string pal is a palindrome.
      pal is checked by comparing the first character to the last character
      (case-insensitive).  Returns true if palindrome, false else.
      Strings that are 1 character long count as palindromes
      ie. "i", "a", "p".
   */
   private static boolean isPalindrome(String pal)
   {
      int size = pal.length();
      for (int i = 0; i < size/2; i++)
      {
         char first = pal.charAt(i);
         char last = pal.charAt(size-1-i);
         if (!(Character.toLowerCase(first) == Character.toLowerCase(last)))
            return false;
      }
      return true;
   }
   
   /*
      Checks if the current string word already exists in the list frequencies.
      If yes, it returns the index that the word is found at.
      If no, it returns -1.
   */
   private static int strInFreq(String word, List<Frequency> frequencies)
   {
      for (int i = 0; i < frequencies.size(); i++)
      {
         if (frequencies.get(i).getText().toLowerCase().equals(word.toLowerCase()))
            return i;
      }
      return -1;
   }
   
	/**
	 * Runs the 2-gram counter. The input should be the path to a text file.
	 * 
	 * @param args The first element should contain the path to a text file.
	 */
	public static void main(String[] args)
   {
      try
      {
		File file = new File("D:/Users/Aaron/Documents/Projects/Projects/UCI/CS121/Assignment1/Assignment1/palindromes.txt");//args[0]);
		ArrayList<String> words = Utilities.tokenizeFile(file);
		List<Frequency> frequencies = computePalindromeFrequencies(words);
		Utilities.printFrequencies(frequencies);
      }
      catch (Exception e)
      {
         System.err.println("File could not be found.");
      }
	}
}
