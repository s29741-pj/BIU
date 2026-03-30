const lines = require("fs")
	.readFileSync("/dev/stdin", "utf8")
	.trim()
	.split("\n");

function normalizeValues(arr) {
	const readingsNumber = arr[0];
	const readingsArr = arr[1].split(" ").map(Number);
	const min = Math.min(...readingsArr);
	const max = Math.max(...readingsArr);

	console.log(
		readingsArr.map(num => ((num - min) / (max - min)).toFixed(4)).join(" "),
	);
}

normalizeValues(lines);

// TODO
