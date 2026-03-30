const lines = require("fs")
	.readFileSync("/dev/stdin", "utf8")
	.trim()
	.split("\n");
// TODO

const k = Number(lines[0]);
const n = Number(lines[1]);
const nums = lines[2].split(" ").map(Number);

function makeWindow(k) {
	let buffer = [];

	return function (val) {
		buffer.push(val);
		if (buffer.length > k) buffer.shift();
		return Math.max(...buffer);
	};
}

const window = makeWindow(k);

for (const num of nums) {
	const max = window(num);
	console.log(max);
}
