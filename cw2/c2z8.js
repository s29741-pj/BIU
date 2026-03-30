const lines = require("fs")
	.readFileSync("/dev/stdin", "utf8")
	.trim()
	.split("\n");
// TODO

const init = lines[0].split(" ").reduce((property, element) => {
	const splitted = element.split("=");
	property[splitted[0]] = Number(splitted[1]);
	return property;
}, {});

const updates = Number(lines[1]);

const data = lines.slice(2).map(line => {
	const obj = {};
	const splitted = line.split(" ");
	obj[splitted[0]] = Number(splitted[1]);
	return obj;
}, {});

const copyList = [];
copyList.push({ ...init });

data.forEach(obj => {
	const update = Object.entries(obj)[0];
	const lastObj = { ...copyList.slice(-1)[0] };
	lastObj[update[0]] = update[1];

	copyList.push(
		Object.fromEntries(
			Object.entries(lastObj).sort(([a], [b]) => a.localeCompare(b)),
		),
	);
});

const print = copyList
	.slice(1)
	.map(obj =>
		Object.entries(obj)
			.map(([k, v]) => `${k}=${v}`)
			.join(" "),
	)
	.join("\n---\n");

console.log(print);
