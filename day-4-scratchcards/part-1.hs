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
    nat
    char ':'
    space
    firstNumbers <- listOfNumbers
    space
    char '|'
    space
    lastNumbers <- listOfNumbers
    return (firstNumbers, lastNumbers)

line :: [String] -> IO Int
line [] = do return 0
line (card : cards) = do
    let numbers = fst $ head $ parse gameParser card
    let intersection = length $ uncurry intersect numbers
    let power = 0 `max` (intersection - 1)
    let number = if intersection > 0 then 1 * (2 ^ power) else 0

    numbers <- line cards
    return $ number + numbers

main = do
    input <- readFile "input"
    let cards = lines input
    sum <- line cards

    print sum
