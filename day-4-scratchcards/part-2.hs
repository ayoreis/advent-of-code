import Data.List
import Parsing

listOfNumbers = do
    number <- nat
    space
    numbers <- listOfNumbers
    return $ number : numbers
    <|> do
        number <- nat
        return [number]

gameParser = do
    string "Card"
    space
    id <- nat
    char ':'
    space
    firstNumbers <- listOfNumbers
    space
    char '|'
    space
    lastNumbers <- listOfNumbers
    return (id, firstNumbers, lastNumbers)

line :: [String] -> [String] -> IO Int
line _ [] = do return 0
line (_ : cards) (copy : copies) = do
    let (id, first_numbers, last_numbers) = fst $ head $ parse gameParser copy
    let intersection = length $ first_numbers `intersect` last_numbers

    nested_count <- line cards (take intersection cards) 
    sequencial_count <- line cards copies

    return $ nested_count + sequencial_count + 1

main = do
    input <- readFile "input"
    let cards = lines input

    sum <- line cards cards

    print sum
