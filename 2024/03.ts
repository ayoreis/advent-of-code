import { count } from "../functions.ts";

export function parse(input: string) {
	return input.matchAll(
		/do\(\)|don't\(\)|mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/g,
	).map((instruction) => {
		if (instruction[0] === "do()") return { type: "do" } as const;
		if (instruction[0] === "don't()") return { type: "don't" } as const;

		return {
			type: "mul",
			a: Number(instruction.groups!.a),
			b: Number(instruction.groups!.b),
		} as const;
	});
}

export function part_1(instructions: ReturnType<typeof parse>) {
	return count(instructions, (instruction) => {
		if (instruction.type !== "mul") return false;
		return instruction.a * instruction.b;
	});
}

export function part_2(instructions: ReturnType<typeof parse>) {
	let enabled = true;

	return count(instructions, (instruction) => {
		if (instruction.type === "do") enabled = true;
		else if (instruction.type === "don't") enabled = false;
		else if (enabled) return instruction.a * instruction.b;
		return 0;
	});
}
