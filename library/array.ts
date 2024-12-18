export function count<T>(array: T[], callback: (value: T) => number) {
	return array.reduce(
		(accumulator, value) => accumulator + callback(value),
		0,
	);
}
