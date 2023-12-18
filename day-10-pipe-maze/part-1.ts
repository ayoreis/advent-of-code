// https://adventofcode.com/2023/day/10

const VERTICAL = '|';
const HORIZONTAL = '-';
const NORTH_EAST = 'L';
const NORTH_WEST = 'J';
const SOUTH_WEST = '7';
const SOUTH_EAST = 'F';
const START = 'S';

const CONNECTS_UP_SET = new Set([VERTICAL, NORTH_EAST, NORTH_WEST, START]);
const CONNECTS_RIGHT_SET = new Set([HORIZONTAL, NORTH_EAST, SOUTH_EAST, START]);
const CONNECTS_DOWN_SET = new Set([VERTICAL, SOUTH_WEST, SOUTH_EAST, START]);
const CONNECTS_LEFT_SET = new Set([HORIZONTAL, NORTH_WEST, SOUTH_WEST, START]);

const input = await Deno.readTextFile('day-10-pipe-maze/input');
const loop = input.split('\n');

const width = loop[0]!.length;
// HACK `loop.join('')` to not count newlines
const start_index = loop.join('').indexOf(START);

let steps = 0;
let row = Math.floor(start_index / width);
let column = start_index % width;
let previous_row, previous_column;
let pipe = loop[row]![column]!;

do {
	steps++;

	// await new Promise((resolve) => setTimeout(resolve, 100));

	const up = !(previous_row === row - 1 && previous_column === column) &&
		CONNECTS_DOWN_SET.has(loop[row - 1]?.[column]!) &&
		CONNECTS_UP_SET.has(pipe);
	const right = !(previous_row === row && previous_column === column + 1) &&
		CONNECTS_LEFT_SET.has(loop[row]?.[column + 1]!) &&
		CONNECTS_RIGHT_SET.has(pipe);
	const down = !(previous_row === row + 1 && previous_column === column) &&
		CONNECTS_UP_SET.has(loop[row + 1]?.[column]!) &&
		CONNECTS_DOWN_SET.has(pipe);
	const left = !(previous_row === row && previous_column === column - 1) &&
		CONNECTS_RIGHT_SET.has(loop[row]?.[column - 1]!) &&
		CONNECTS_LEFT_SET.has(pipe);

	previous_row = row;
	previous_column = column;

	// Up
	if (up) {
		row--;
	} else if (right) {
		column++;
	} else if (down) {
		row++;
	} else if (left) {
		column--;
	}

	pipe = loop[row]![column]!;
} while (pipe !== START);

console.log(steps / 2);
