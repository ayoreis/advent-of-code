const cookie = Deno.env.get("COOKIE");
const cache = await caches.open("input");

export async function get_input(year: number, day: number) {
	const url = `https://adventofcode.com/${year}/day/${day}/input`;
	const headers = { "Cookie": `session=${cookie}` };
	const request = new Request(url, { headers });
	let response = await cache.match(request);

	if (!response) {
		response = await fetch(request);
		await cache.put(request, response.clone());
	}

	return await response.text();
}
