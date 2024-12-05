import { count } from "../functions.ts";

export function parse(input: string) {
	const rules_and_updates = input.split("\n\n");
	const rules_array = rules_and_updates[0].split("\n")
		.map((rule) => rule.split("|").map(Number));
	const rules = new Map<number, Set<number>>();

	for (const [before, after] of rules_array) {
		rules.set(before, rules.get(before)?.add(after) ?? new Set([after]));
	}

	const updates = rules_and_updates[1].split("\n")
		.filter(Boolean)
		.map((update) => update.split(",").map(Number));

	return { rules, updates };
}

function is_update_correct(rules: Map<number, Set<number>>, update: number[]) {
	for (let index = 0; index < update.length; index++) {
		const before = update[index];

		for (let jndex = index + 1; jndex < update.length; jndex++) {
			const after = update[jndex];

			if (!rules.get(before)!.has(after)) return false;
		}
	}

	return true;
}

export function part_1({ rules, updates }: ReturnType<typeof parse>) {
	return count(updates, (update) => {
		if (!is_update_correct(rules, update)) return 0;
		return update[Math.floor(update.length / 2)];
	});
}

export function part_2({ rules, updates }: ReturnType<typeof parse>) {
	return count(updates, (update) => {
		if (is_update_correct(rules, update)) return 0;
		update.sort((before, after) => rules.get(before)!.has(after) ? 1 : -1);
		return update[Math.floor(update.length / 2)];
	});
}
