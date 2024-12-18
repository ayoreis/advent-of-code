// [Bridge Repair](https://adventofcode.com/2024/day/7)

import { assertEquals } from "@std/assert";
import { get_input } from "../library/input.ts";
import { lines } from "../library/lines.ts";
import { add, concatenate, multiply } from "../library/number.ts";

interface CalibrationEquation {
	readonly test_value: number;
	readonly numbers: number[];
}

type Operator = (a: number, b: number) => number;

function parse(input: string) {
	return lines(input).map((calibration_equation) => {
		const [raw_test_value, raw_numbers] = calibration_equation.split(":");
		const test_value = Number(raw_test_value);
		const numbers = raw_numbers.trimStart().split(" ").map(Number);
		return { test_value, numbers } satisfies CalibrationEquation;
	});
}

function test(
	operators: Operator[],
	{ test_value, numbers: [a, b, ...numbers] }: CalibrationEquation,
): boolean {
	if (b === undefined) return a === test_value;

	return operators.some((operator) =>
		test(operators, { test_value, numbers: [operator(a, b), ...numbers] })
	);
}

function total_calibration_result(
	calibration_equations: CalibrationEquation[],
	operators: Operator[],
) {
	return calibration_equations.reduce(
		(total_calibration_result, equation) =>
			total_calibration_result +
			(test(operators, equation) ? equation.test_value : 0),
		0,
	);
}

function part_1(calibration_equations: CalibrationEquation[]) {
	const operators = [add, multiply];
	return total_calibration_result(calibration_equations, operators);
}

function part_2(calibration_equations: CalibrationEquation[]) {
	const operators = [add, multiply, concatenate];
	return total_calibration_result(calibration_equations, operators);
}

const EXAMPLE = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

const input = await get_input(2024, 7);

Deno.test("2024 day 7: Bridge Repair", async (context) => {
	await context.step("Part 1", async (context) => {
		await context.step("Example", () => {
			assertEquals(part_1(parse(EXAMPLE)), 3749);
		});

		await context.step("Full input", () => {
			assertEquals(part_1(parse(input)), 3351424677624);
		});
	});

	await context.step("Part 2", async (context) => {
		await context.step("Example", () => {
			assertEquals(part_2(parse(EXAMPLE)), 11387);
		});

		await context.step("Full input", () => {
			assertEquals(part_2(parse(input)), 204976636995111);
		});
	});
});
