// [Restroom Redoubt](https://adventofcode.com/2024/day/14)

import { assertEquals } from "@std/assert";
import { lines } from "../library/lines.ts";
import { get_input } from "../library/input.ts";

interface Robot {
	position_x: number;
	position_y: number;
	velocity_x: number;
	velocity_y: number;
}

const ROBOT =
	/^p=(?<position_x>-?\d+),(?<position_y>-?\d+) v=(?<velocity_x>-?\d+),(?<velocity_y>-?\d+)$/;

function parse(input: string) {
	return lines(input).map((line) => {
		const match = line.match(ROBOT)!;

		return {
			position_x: Number(match.groups!.position_x),
			position_y: Number(match.groups!.position_y),
			velocity_x: Number(match.groups!.velocity_x),
			velocity_y: Number(match.groups!.velocity_y),
		};
	});
}

function modulo(n: number, m: number) {
	return ((n % m) + m) % m;
}

function part_1(robots: Robot[], tiles_wide: number, tiles_tall: number) {
	for (let seconds = 0; seconds < 100; seconds++) {
		for (const robot of robots) {
			robot.position_x = modulo(
				robot.position_x + robot.velocity_x,
				tiles_wide,
			);

			robot.position_y = modulo(
				robot.position_y + robot.velocity_y,
				tiles_tall,
			);
		}
	}

	const top_left_quadrant = [];
	const top_right_quadrant = [];
	const bottom_right_quadrant = [];
	const bottom_left_quadrant = [];

	for (const robot of robots) {
		const in_top_quadrant = robot.position_y < Math.floor((tiles_tall - 1) / 2);
		const in_left_quadrant =
			robot.position_x < Math.floor((tiles_wide - 1) / 2);
		const in_right_quadrant =
			robot.position_x > Math.ceil((tiles_wide - 1) / 2);
		const in_bottom_quadrant =
			robot.position_y > Math.ceil((tiles_tall - 1) / 2);

		if (in_top_quadrant && in_left_quadrant) {
			top_left_quadrant.push(robot);
		} else if (in_top_quadrant && in_right_quadrant) {
			top_right_quadrant.push(robot);
		} else if (in_bottom_quadrant && in_right_quadrant) {
			bottom_right_quadrant.push(robot);
		} else if (in_bottom_quadrant && in_left_quadrant) {
			bottom_left_quadrant.push(robot);
		}
	}

	return top_left_quadrant.length * top_right_quadrant.length *
		bottom_right_quadrant.length * bottom_left_quadrant.length;
}

const EXAMPLE = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;

const input = await get_input(2024, 14);

Deno.test("Day 14: Restroom Redoubt", async (context) => {
	await context.step("Part 1", async (context) => {
		await context.step("Example", () => {
			assertEquals(part_1(parse(EXAMPLE), 11, 7), 12);
		});

		await context.step("Full input", () => {
			assertEquals(part_1(parse(input), 101, 103), 211773366);
		});
	});
});
