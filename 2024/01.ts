import { count, zip } from "../functions.ts";

export function parse(input: string) {
	const left_numbers = [];
	const right_numbers = [];

	for (const line of input.split("\n").filter(Boolean)) {
		const [left, right] = line.split("   ");
		left_numbers.push(Number(left));
		right_numbers.push(Number(right));
	}

	left_numbers.sort();
	right_numbers.sort();

	return [left_numbers, right_numbers];
}

export function part_1(
	[left_numbers, right_numbers]: ReturnType<typeof parse>,
) {
	return count(zip(left_numbers, right_numbers), ([left, right]) => {
		return Math.abs(left - right);
	});
}

export function part_2(
	[left_numbers, right_numbers]: ReturnType<typeof parse>,
) {
	const numbers = new Map();

	for (const number of right_numbers) {
		numbers.set(number, (numbers.get(number) ?? 0) + 1);
	}

	return count(left_numbers, (number) => {
		return number * (numbers.get(number) ?? 0);
	});
}
