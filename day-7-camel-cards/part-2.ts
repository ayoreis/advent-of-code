// https://adventofcode.com/2023/day/7#part2

const LABELS = 'AKQT98765432J'.split('').toReversed().join('');
const JOKER = 'J';

function type(cards: string) {
	const map = cards.split('').reduce(
		(map, card) => map.set(card, (map.get(card)! ?? 0) + 1),
		new Map<string, number>(),
	);

	const jokers = map.get(JOKER);

	if (jokers !== undefined && jokers < 5) {
		map.delete(JOKER);

		const max = Array.from(map.entries())
			.reduce((max, value) => value[1] > max[1] ? value : max)[0];

		map.set(max, map.get(max)! + jokers);
	}

	const values = Array.from(map.values());

	if (values.length === 1) return 6;
	if (values.length === 2 && values.includes(1)) return 5;
	if (values.length === 2) return 4;
	if (values.length === 3 && values.includes(3)) return 3;
	if (values.length === 3) return 2;
	if (values.length === 4) return 1;

	return 0;
}

function strength(card: string) {
	return LABELS.indexOf(card);
}

const input = await Deno.readTextFile('day-7-camel-cards/input');
const hands = input.split('\n');

const total_winnings = hands
	.map((hand) => {
		const [cards, bid] = hand.split(' ');
		return { cards, bid: Number(bid) };
	})
	.toSorted(({ cards }, { cards: other_cards }) => {
		const cards_type = type(cards);
		const other_cards_type = type(other_cards);

		if (cards_type > other_cards_type) return 1;
		if (cards_type < other_cards_type) return -1;

		for (let index = 0; index < 5; index++) {
			const card_strength = strength(cards[index]);
			const other_card_strength = strength(other_cards[index]);

			if (card_strength > other_card_strength) return 1;
			if (card_strength < other_card_strength) return -1;
		}

		return 0;
	})
	.reduce((winnings, { bid }, rank) => winnings + bid * (rank + 1), 0);

console.log({ total_winnings });
