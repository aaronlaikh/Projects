-- Name:Aaron Lai
-- ID:93309744
-- Prof Alfaro UCI Fall 2015 CS141

-- NOTES
-- Don't import any libraries.
-- You CAN'T use the built in sort or maximum functions.
-- Type "test_all" to run all tests.
-- We will use extra tests when grading.
-- Problem 5: You must use a higher-order function. See P5 for more info.

-- Problem 1
insert :: (Ord a) => [a] -> a -> [a]
insert [] x = [x]
insert (y:ys) x = if x <= y then x:y:ys else y : insert ys x

-- Problem 2
-- Remember to use the insertion sort algorithm here.
-- (Wikipedia has a good explanation).
insertSort :: (Ord a) => [a] -> [a]
insertSort [] = []
insertSort (x:xs) = insert (insertSort xs) x


-- Problem 3
mergeTwo :: (Ord a) => [a] -> [a] -> [a]
mergeTwo s [] = s
mergeTwo [] t = t
mergeTwo x (y:ys) = insertSort(insert (mergeTwo x ys) y)

merge :: (Ord a) => [[a]] -> [a]
merge [] = []
merge [x] = x
merge (x:xs) = mergeTwo x (merge xs)

-- Problem 4
center :: [a] -> Int -> a -> [a]
center x n f = left ++ x ++ right where
                w = n - (length x)
                l = w `div` 2
                r = w - l
                left = replicate l f
                right = replicate r f
--center xs n fill = [] -- this is wrong, delete this!

-- Problem 5
-- Remember to use a higher order function here.
--
-- Example of using higher-order function (map in this case):
-- doubleList xs = map (* 2) xs
-- Other higher-order functions to look at:
-- filter
-- foldl, foldr, foldl1, foldr1 (all similar)
largest :: (Ord a) => [a] -> a
largest (x:xs) = foldl max x xs

---------- TESTING -----------

failure output expected     = " --> TEST FAILED. Your output: " 
                              ++ (show output) ++ " expected: " 
                              ++ (show expected)
failures output expecteds    = " --> TEST FAILED. Your output: " 
                              ++ (show output) ++ " expected: " 
                              ++ (show (head expecteds)) ++ " OR " 
                              ++ (show (last expecteds))

test output expected        = if (output == expected)
                              then putStrLn " OK"
                              else putStrLn (failure output expected)

-- For tests where there are 2 answers allowed.
testMultiple output expecteds = if (any (== output) expecteds)
                              then putStrLn " OK"
                              else putStrLn (failures output expecteds)

problem index name  = do
                      putStrLn ""
                      putStrLn ("Problem " ++ (show index) ++ ": " ++ name)
testname name       = putStr ("-- " ++ name)

-- Add your own tests here.
test_insert = do
                problem 1 "Insert"
                testname "Simple test"
                test (insert [1, 2, 3, 4, 5, 7,8,9] 6) [1, 2, 3, 4, 5, 6, 7, 8, 9];

test_insertSort = do 
                problem 2 "InsertSort"
                testname "Simple test"
                test (insertSort [2,4,0,1]) [0,1,2,4]

test_merge = do 
                problem 3 "Merge"
                testname "Simple test"
                test (merge [[1,2,3],[4,5,6]]) [1,2,3,4,5,6]
                testname "4-list test, varying size"
                test (merge [[],[1,3],[4,6,9], [2,5,7,8,10]]) [1,2,3,4,5,6,7,8,9,10]

test_center = do 
                problem 4 "Center"
                testname "Testing strings"
                testMultiple (center "hello" 8 '+') ["+hello++", "++hello+"]
                testname "Testing integers"
                test (center [0, 5, 10, 10] 8 2) [2,2,0,5,10,10,2,2]

test_largest = do 
                problem 5 "Largest"
                testname "Testing sorted list"
                test (largest [1,2,3,4,5]) 5
                testname "Testing floats"
                test (largest [1.0, 2.2, 3.3, 6.5, 42.0]) 42.0
                testname "Testing duplicates"
                test (largest [0, 5, 10, 10, 3]) 10
        
-- Comment out any functions that haven't been implemented yet.    
test_all = do
           test_insert
           test_insertSort
           test_merge
           test_center
           test_largest