function get_number(line: string) {
	return Number(line.split(':')[1].match(/\d+/g)!.join(''));
}

const input = await Deno.readTextFile('day-6-wait-for-it/input');
const [times_line, distances_line] = input.split('\n');
const time = get_number(times_line);
const distance_to_beat = get_number(distances_line);

let ways_to_beat = 0;

for (let hold = 0; hold <= time; hold++) {
	const speed = hold;
	const distance = (time - hold) * speed;

	if (distance > distance_to_beat) ways_to_beat++;
}

console.log({ ways_to_beat });
