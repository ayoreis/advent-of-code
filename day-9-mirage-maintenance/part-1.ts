// https://adventofcode.com/2023/day/9

function difference(numbers: number[]): number {
	if (numbers.every((number) => number === 0)) return 0;

	const differences = numbers.slice(1)
		.map((difference, index) => difference - numbers[index]);

	return numbers.at(-1)! + difference(differences);
}

const input = await Deno.readTextFile('day-9-mirage-maintenance/input');
const histories = input.split('\n');

const sum = histories
	.map((history) => difference(history.split(' ').map(Number)))
	.reduce((sum, history) => sum + history);

console.log({ sum });
