// https://adventofcode.com/2023/day/7

const LABELS = 'AKQJT98765432'.split('').toReversed().join('');

function type(cards: string) {
	const map = cards.split('').reduce(
		(map, card) => map.set(card, map.get(card)! + 1 || 0),
		new Map<string, number>(),
	);

	const values = Array.from(map.values());

	if (map.size === 1) return 6;
	if (map.size === 2 && values.includes(1)) return 5;
	if (map.size === 2) return 4;
	if (map.size === 3 && values.includes(3)) return 3;
	if (map.size == 3) return 2;
	if (map.size === 4) return 1;

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
