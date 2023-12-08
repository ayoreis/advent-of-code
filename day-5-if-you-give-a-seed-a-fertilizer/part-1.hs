import Parsing
import Data.Ix (inRange)

type Transform = (Int, Int, Int)

numberParser :: Parser Int
numberParser = do
    number <- nat
    optional $ char ' '
    return number

numbersParser :: Parser Transform
numbersParser = do
    destination_range_start <- numberParser
    source_range_start <- numberParser
    range_length <- numberParser
    optional $ char '\n'
    return (destination_range_start, source_range_start, range_length)

mapParser :: Parser [Transform]
mapParser = do
    ident
    string "-to-"
    ident
    string " map:\n"
    numbers <- some numbersParser
    optional $ char '\n'
    return numbers

almanacParser :: Parser ([Int], [[Transform]])
almanacParser = do
    string "seeds: "
    seeds <- some numberParser
    string "\n\n"
    maps <- some mapParser
    return (seeds, maps)

transformNumber :: [Transform] -> Int -> Int
transformNumber [] seed = seed
transformNumber (transform : map) seed =
    let (destination_range_start, source_range_start, range_length) = transform in
    let source_range_end = source_range_start + range_length in

    if inRange (source_range_start, source_range_end) seed
        then seed + (destination_range_start - source_range_start)
        else transformNumber map seed

transform :: [Int] -> [[Transform]] -> [Int]
transform = foldl(\numbers map -> Prelude.map (transformNumber map) numbers)

main :: IO Int
main = do
    input <- readFile "day-5-if-you-give-a-seed-a-fertilizer/input"
    let (seeds, maps) = fst . head $ parse almanacParser input

    return $ minimum $ transform seeds maps
