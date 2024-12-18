export function add(a: number, b: number) {
	return a + b;
}

export function multiply(a: number, b: number) {
	return a * b;
}

export function length(number: number) {
	return Math.floor(Math.log10(Math.abs(number))) + 1;
}

export function concatenate(a: number, b: number) {
	return a * 10 ** length(b) + b;
}
