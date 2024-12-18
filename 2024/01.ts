// [Historian Hysteria](https://adventofcode.com/2024/day/1)

import { assertEquals } from "@std/assert";
import { unzip, zip } from "@std/collections";
import { get_input } from "../library/input.ts";
import { lines } from "../library/lines.ts";
import { count } from "../library/array.ts";

function parse(input: string) {
	return unzip(
		lines(input).map((line) =>
			line.split("   ").map(Number) as [number, number]
		),
	).map((list) => list.toSorted());
}

function part_1([left, right]: ReturnType<typeof parse>) {
	return count(zip(left, right), ([left, right]) => Math.abs(left - right));
}

function part_2([left, right]: ReturnType<typeof parse>) {
	const occurrences = new Map<number, number>();

	for (const number of right) {
		occurrences.set(number, (occurrences.get(number) ?? 0) + 1);
	}

	return count(left, (number) => number * (occurrences.get(number) ?? 0));
}

const EXAMPLE = `3   4
4   3
2   5
1   3
3   9
3   3`;

const input = await get_input(2024, 1);

Deno.test("2024 day 1: Historian Hysteria", async (context) => {
	await context.step("Part 1", async (context) => {
		await context.step("Example", () => {
			assertEquals(part_1(parse(EXAMPLE)), 11);
		});

		await context.step("Full input", () => {
			assertEquals(part_1(parse(input)), 1970720);
		});
	});

	await context.step("Part 2", async (context) => {
		await context.step("Example", () => {
			assertEquals(part_2(parse(EXAMPLE)), 31);
		});

		await context.step("Full input", () => {
			assertEquals(part_2(parse(input)), 17191599);
		});
	});
});
