const NUMBER = /\d+/g;

function main(
	[_card, ...cards]: string[],
	[copy, ...copies]: string[],
): number {
	if (copy === undefined) return 0;

	const numbers = copy.split(':')[1].split('|');
	const first_numbers = numbers[0].match(NUMBER)!;
	const last_numbers = numbers[1].match(NUMBER)!;
	const intersection =
		first_numbers.filter((value) => last_numbers.includes(value)).length;

	const nested_count = main(cards, cards.slice(0, intersection));
	const sequential_count = main(cards, copies);

	return nested_count + sequential_count + 1;
}

const input = await Deno.readTextFile('input');
const cards = input.split('\n');

console.log(main(cards, cards));
