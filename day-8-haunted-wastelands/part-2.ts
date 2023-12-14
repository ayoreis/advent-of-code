// https://adventofcode.com/2023/day/8

/** https://en.wikipedia.org/wiki/Greatest_common_divisor */
function greatest_common_divisor(a: number, b: number) {
	if (!b) return a;

	return greatest_common_divisor(b, a % b);
}

/** https://en.wikipedia.org/wiki/Least_common_multiple */
function least_common_multiple(numbers: number[]) {
	return numbers.reduce((least_common_multiple, num) =>
		least_common_multiple * num /
		greatest_common_divisor(least_common_multiple, num)
	);
}

const input = await Deno.readTextFile('day-8-haunted-wastelands/input');
const [instructions, _, ...node_definitions] = input.split('\n');

const nodes = new Map<string, [string, string]>();

for (const definition of node_definitions) {
	const [node, links] = definition.split(' = ');
	nodes.set(node, links.slice(1, -1).split(', ') as [string, string]);
}

const start_nodes = Array.from(nodes.keys()).filter((key) => key.endsWith('A'));
const cycles = [];

function* infinite_instructions() {
	while (true) for (const instruction of instructions) yield instruction;
}

for (let node of start_nodes) {
	let instruction_index = 0;

	for (const instruction of infinite_instructions()) {
		instruction_index += 1;

		node = nodes.get(node)![instruction == 'L' ? 0 : 1];

		if (!node.endsWith('Z')) continue;

		cycles.push(instruction_index);

		break;
	}
}

const steps = least_common_multiple(cycles);

console.log({ steps });
