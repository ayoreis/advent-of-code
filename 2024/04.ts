export function parse(input: string) {
	return input.split("\n").map((row) => row.split(""));
}

function count<Type>(
	array: Type[],
	callback: (value: Type, index: number) => number,
) {
	return array.reduce((accumulator, value, index) => {
		return callback(value, index) + accumulator;
	}, 0);
}

function try_direction(
	input: ReturnType<typeof parse>,
	row: number,
	column: number,
	row_ofset: number,
	column_ofset: number,
) {
	const first = input[row][column];
	if (first !== "X") return false;
	const second = input[row + row_ofset]?.[column + column_ofset];
	if (second !== "M") return false;
	const third = input[row + row_ofset * 2]?.[column + column_ofset * 2];
	if (third !== "A") return false;
	const fourth = input[row + row_ofset * 3]?.[column + column_ofset * 3];
	if (fourth !== "S") return false;

	return true;
}

function is_xmas(
	input: ReturnType<typeof parse>,
	row: number,
	column: number,
) {
	let count = 0;

	if (try_direction(input, row, column, -1, -1)) count++;
	if (try_direction(input, row, column, -1, 0)) count++;
	if (try_direction(input, row, column, -1, 1)) count++;
	if (try_direction(input, row, column, 0, -1)) count++;
	if (try_direction(input, row, column, 0, 1)) count++;
	if (try_direction(input, row, column, 1, -1)) count++;
	if (try_direction(input, row, column, 1, 0)) count++;
	if (try_direction(input, row, column, 1, 1)) count++;

	return count;
}

export function part_1(input: ReturnType<typeof parse>) {
	return count(input, (row, row_index) => {
		return count(row, (_column, column_index) => {
			return is_xmas(input, row_index, column_index);
		});
	});
}

function is_s_or_m(letter: string) {
	return letter === "S" || letter === "M";
}

function is_x_mas(
	input: ReturnType<typeof parse>,
	row: number,
	column: number,
) {
	if (input[row][column] !== "A") return 0;
	const top_row = input[row - 1];
	const top_left = top_row?.[column - 1];
	if (!is_s_or_m(top_left)) return 0;
	const top_right = top_row?.[column + 1];
	if (!is_s_or_m(top_right)) return 0;
	const bottom_row = input[row + 1];
	const bottom_left = bottom_row[column - 1];
	if (!is_s_or_m(bottom_left) || bottom_left === top_right) return 0;
	const bottom_right = bottom_row[column + 1];
	if (!is_s_or_m(bottom_right) || bottom_right === top_left) return 0;

	return 1;
}

export function part_2(input: ReturnType<typeof parse>) {
	return count(input, (row, row_index) => {
		return count(row, (_column, column_index) => {
			return is_x_mas(input, row_index, column_index);
		});
	});
}
