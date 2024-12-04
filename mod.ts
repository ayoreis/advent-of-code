const STYLE = ["color: yellow;", "", "color: green;"];

const [year, day] = Deno.args[0].split("/");
const number_format = new Intl.NumberFormat("en", { minimumIntegerDigits: 2 });
const filepath = `${year}/${number_format.format(Number(day))}.ts`;

try {
	await Deno.stat(filepath);
} catch {
	await Deno.writeTextFile(
		filepath,
		`export function parse(input: string) {
	return input
}

export function part_1(input: ReturnType<typeof parse>) {
	return input
}

export function part_2(input: ReturnType<typeof parse>) {
	return input
}
`,
	);
}

const input_url = `https://adventofcode.com/${year}/day/${day}/input`;
const cookie = Deno.env.get("COOKIE")!;
const response = await fetch(input_url, { headers: { "Cookie": cookie } });
const input = await response.text();

const { parse, part_1, part_2 } = await import(`./${filepath}`);

const parsed_input = parse(input);

console.log(`%c*%c Part 1: %c${part_1(parsed_input)}`, ...STYLE);
console.log(`%c*%c Part 2: %c${part_2(parsed_input)}`, ...STYLE);
