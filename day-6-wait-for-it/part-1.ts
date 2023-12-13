function get_numbers(line: string) {
	return line.split(':')[1].match(/\d+/g)!.map(Number);
}

const input = await Deno.readTextFile('day-6-wait-for-it/input');
const [times_line, distances_line] = input.split('\n');
const times = get_numbers(times_line);
const distances = get_numbers(distances_line);
const races = times.map((time, index) => ({
	time,
	distance_to_beat: distances[index],
}));

let margin_of_error = 1;

for (const { time, distance_to_beat } of races) {
	let ways_to_beat = 0;

	for (let hold = 0; hold <= time; hold++) {
		const speed = hold;
		const distance = (time - hold) * speed;

		if (distance > distance_to_beat) ways_to_beat++;
	}

	if (ways_to_beat !== 0) margin_of_error *= ways_to_beat;
}

console.log({ margin_of_error });
