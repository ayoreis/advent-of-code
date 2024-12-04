export function* zip<A, B>(a: A[], b: B[]) {
	for (let index = 0; index < a.length; index++) {
		yield [a[index], b[index]];
	}
}

export function count<Type>(
	iterable: Type[] | IteratorObject<Type>,
	callback: (value: Type, index: number) => boolean | number,
) {
	if (Array.isArray(iterable)) {
		iterable = iterable[Symbol.iterator]();
	}

	return iterable.reduce((accumulator, value, index) => {
		const result = callback(value, index);
		const number = typeof result === "boolean" ? result ? 1 : 0 : result;
		return number + accumulator;
	}, 0);
}

/** Inpired by https://hexdocs.pm/gleam_stdlib/gleam/list.html#window */
export function* window<Type>(array: Type[], by: number) {
	for (let index = 0; index < array.length - 1; index++) {
		yield array.slice(index, index + by);
	}
}
