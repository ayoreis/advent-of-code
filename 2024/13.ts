// [Claw Contraption](https://adventofcode.com/2024/day/13)

import { assertEquals } from "@std/assert";
import { count } from "../library/array.ts";
import { get_input } from "../library/input.ts";

interface ClawMachine {
	button_a_x: number;
	button_a_y: number;
	button_b_x: number;
	button_b_y: number;
	prize_x: number;
	prize_y: number;
}

const CLAW_MACHINE =
	/^Button A: X\+(?<button_a_x>\d+), Y\+(?<button_a_y>\d+)\nButton B: X\+(?<button_b_x>\d+), Y\+(?<button_b_y>\d+)\nPrize: X=(?<prize_x>\d+), Y=(?<prize_y>\d+)$/;

function parse(input: string) {
	return input.trimEnd().split("\n\n").map((block) => {
		const match = block.match(CLAW_MACHINE)!;

		return {
			button_a_x: Number(match.groups!.button_a_x),
			button_a_y: Number(match.groups!.button_a_y),
			button_b_x: Number(match.groups!.button_b_x),
			button_b_y: Number(match.groups!.button_b_y),
			prize_x: Number(match.groups!.prize_x),
			prize_y: Number(match.groups!.prize_y),
		};
	});
}

function part_1(claw_machines: ClawMachine[]) {
	return count(claw_machines, (claw_machine) => {
		let min_tokens = null;

		for (let a_presses = 0; a_presses < 100; a_presses++) {
			for (let b_presses = 0; b_presses < 100; b_presses++) {
				if (
					(claw_machine.prize_x ===
						(claw_machine.button_a_x * a_presses) +
							(claw_machine.button_b_x * b_presses)) &&
					(claw_machine.prize_y ===
						(claw_machine.button_a_y * a_presses) +
							(claw_machine.button_b_y * b_presses))
				) {
					const tokens = (a_presses * 3) + (b_presses * 1);
					min_tokens ??= tokens;
					min_tokens = Math.min(min_tokens, tokens);
				}
			}
		}

		return min_tokens ?? 0;
	});
}

const EXAMPLE = `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`;

const input = await get_input(2024, 13);

Deno.test("2024 day 13: Claw Contraption", async (context) => {
	await context.step("Part 1", async (context) => {
		await context.step("Example", () => {
			assertEquals(part_1(parse(EXAMPLE)), 480);
		});

		await context.step("Full input", () => {
			assertEquals(part_1(parse(input)), 28138);
		});
	});
});
