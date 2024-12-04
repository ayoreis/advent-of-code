import { count, window } from "../functions.ts";

export function parse(input: string) {
	return input.split("\n").filter(Boolean)
		.map((report) => report.split(" ").map(Number));
}

function is_safe_report(report: number[]) {
	let direction: number;

	for (const [left_level, right_level] of window(report, 2)) {
		const difference = left_level - right_level;
		const window_direction = Math.sign(difference);
		direction ??= window_direction;
		if (window_direction !== direction) return false;
		const absolute_difference = Math.abs(difference);
		if (absolute_difference < 1 || absolute_difference > 3) return false;
	}

	return true;
}

export function part_1(reports: ReturnType<typeof parse>) {
	return count(reports, is_safe_report);
}

function is_dampened_report_safe(report: number[]) {
	return report
		.map((_, index) => report.toSpliced(index, 1))
		.some(is_safe_report);
}

export function part_2(reports: ReturnType<typeof parse>) {
	return count(reports, is_dampened_report_safe);
}
