const lines = require("fs")
	.readFileSync("/dev/stdin", "utf8")
	.trim()
	.split("\n");
// TODO

function airConnections(arr) {
	const n = arr[0];
	const union = [];
	const flights = arr.slice(1).map(line => {
		const city = line.split("-");
		return city;
	});
	const lack = flights.every(way => way.length < 2);
	if (lack) {
		console.log("brak");
	} else {
		const pairs = flights.forEach((way, index) => {
			const reduced = way.reduce((pairs, city, index) => {
				if (index < way.length - 1) {
					pairs.push(`${city}-${way[index + 1]}`);
				}
				return pairs;
			}, []);
			reduced.map(record => union.push(record));
		});
		console.log(
			union
				.filter((e, i, self) => i === self.indexOf(e))
				.sort()
				.join("\n"),
		);
	}
}

airConnections(lines);
