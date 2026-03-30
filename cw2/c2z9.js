const lines = require("fs")
	.readFileSync("/dev/stdin", "utf8")
	.trim()
	.split("\n");
// TODO

const n = Number(lines[0]);
const nums = lines[1].split(" ").map(Number);
const amount = Number(lines[2]);
const tasks = lines.slice(3);

const pipe =
	(...fns) =>
	x =>
		fns.reduce((acc, fn) => fn(acc), x);

// [ [ 'sort' ], [ 'unique' ], [ 'drop', '1' ], [ 'take', '2' ] ]
const tasks_splitted = tasks.map(record => record.split(" "));

const operations = {
	sort: arr => [...arr].sort((a, b) => a - b),
	reverse: arr => [...arr].reverse(),
	unique: arr => arr.filter((e, i, self) => i === self.indexOf(e)),
	take: n => arr => arr.slice(0, n),
	drop: n => arr => arr.slice(n),
	sum: arr => arr.reduce((acc, n) => acc + n, 0),
	max: arr => Math.max(...arr),
	min: arr => Math.min(...arr),
};

const tasks_operations = tasks_splitted.map(record => {
	if (record.length > 1) {
		return operations[record[0]](Number(record[1]));
	} else {
		return operations[record[0]];
	}
});

// console.log(tasks_operations)
const run = pipe(...tasks_operations);
const result = run(nums);

console.log(Array.isArray(result) ? result.join(" ") : result);
