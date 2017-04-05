package ir.assignments.two.c;

import ir.assignments.two.a.Frequency;
import ir.assignments.two.a.Utilities;

import java.io.File;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

/**
 * Count the total number of 2-grams and their frequencies in a text file.
 */
public final class TwoGramFrequencyCounter {
	/**
	 * This class should not be instantiated.
	 */
	private TwoGramFrequencyCounter() {}
	
	/**
	 * Takes the input list of words and processes it, returning a list
	 * of {@link Frequency}s.
	 * 
	 * This method expects a list of lowercase alphanumeric strings.
	 * If the input list is null, an empty list is returned.
	 * 
	 * There is one frequency in the output list for every 
	 * unique 2-gram in the original list. The frequency of each 2-grams
	 * is equal to the number of times that two-gram occurs in the original list. 
	 * 
	 * The returned list is ordered by decreasing frequency, with tied 2-grams sorted
	 * alphabetically. 
	 * 
	 * 
	 * 
	 * Example:
	 * 
	 * Given the input list of strings 
	 * ["you", "think", "you", "know", "how", "you", "think"]
	 * 
	 * The output list of 2-gram frequencies should be 
	 * ["you think:2", "how you:1", "know how:1", "think you:1", "you know:1"]
	 *  
	 * @param words A list of words.
	 * @return A list of two gram frequencies, ordered by decreasing frequency.
	 */
	private static List<Frequency> computeTwoGramFrequencies(ArrayList<String> words) {
      List<Frequency> frequencies = new LinkedList<Frequency>();
      for (int i = 0; i < words.size()-1; i++)
      {
         String w1 = words.get(i);
         String w2 = words.get(i+1);
         String twoGram = w1 + " " + w2;
         int in = strInFreq(twoGram, frequencies);
         if (in >= 0)
         {
            frequencies.get(in).incrementFrequency();
            reorderFreq(in, frequencies);
         }
         else
         {
            addToFreq(twoGram, frequencies, 1);
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
      Adds the string word to the list frequencies with the frequency occurrence.
      Strings are added and ordered by decreasing word length.
      If word length ties, order by decreasing frequency.
      If frequency ties, order by alphabetical order (case-insensitive).
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
      Checks if the current string word already exists in the list frequencies.
      If yes, it returns the index that the word is found at.
      If no, it returns -1.
   */
   private static int strInFreq(String twoGram, List<Frequency> frequencies)
   {
      for (int i = 0; i < frequencies.size(); i++)
      {
         if (frequencies.get(i).getText().equals(twoGram))
            return i;
      }
      return -1;
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
	/**
	 * Runs the 2-gram counter. The input should be the path to a text file.
	 * 
	 * @param args The first element should contain the path to a text file.
	 */
	public static void main(String[] args)
   {
      try
      {
		File file = new File(args[0]);
		ArrayList<String> words = Utilities.tokenizeFile(file);
		List<Frequency> frequencies = computeTwoGramFrequencies(words);
		Utilities.printFrequencies(frequencies);
      }
      catch (Exception e)
      {
         System.err.println("File could not be found.");
      }
	}
}
