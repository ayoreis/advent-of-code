-- https://adventofcode.com/2023/day/8

import Text.Parsec (Parsec, oneOf, count, string, many1, sepBy1, char, parse)
import Data.List (singleton)
import Data.Map (Map, fromList, empty, (!))

data Instruction = LeftInstruction | RightInstruction deriving Show

instruction :: Parsec String () Instruction
instruction = do
    instruction <- oneOf "LR"

    return $ case instruction of
        'L' -> LeftInstruction
        'R' -> RightInstruction

node :: Parsec String () String
node = count 3 $ oneOf ['A'..'Z']

nodeDefinition :: Parsec String () (String, (String, String))
nodeDefinition = do
    node_1 <- node
    string " = ("
    link_1 <- node
    string ", "
    link_2 <- node
    string ")"

    return (node_1, (link_1, link_2))

document :: Parsec String () ([Instruction], Map String (String, String))
document = do
    instructions <- many1 instruction
    string "\n\n"
    nodes <- sepBy1 nodeDefinition $ char '\n'

    return (instructions, fromList nodes)

path :: [Instruction] -> Map String (String, String) -> String -> Int
path _ _ "ZZZ" = 0
path (instruction : instructions) nodes node =
    let (left, right) = nodes ! node in

    (1+) $ path instructions nodes $ case instruction of
        LeftInstruction -> left
        RightInstruction -> right

main :: IO ()
main = do
    let input_path = "day-8-haunted-wastelands/input"
    input <- readFile input_path

    let (instructions, nodes) = case parse document input_path input of
            Right x -> x
            Left _ -> ([], empty :: Map String (String, String))

    print $ path (cycle instructions) nodes "AAA"
