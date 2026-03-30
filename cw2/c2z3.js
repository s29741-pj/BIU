const lines = require("fs")
	.readFileSync("/dev/stdin", "utf8")
	.trim()
	.split("\n");
// TODO

const charList = lines[0].split("");
let result = "";
const uniqueCharsMap = new Map();
const uniqeChars = new Set(lines[0].split(""));

uniqeChars.forEach(char => uniqueCharsMap.set(char, 0));

const acc = charList.reduce(
	(acc, char) => {
		if (char === acc.currentChar) {
			acc.count++;
		} else {
			acc.result += acc.count + acc.currentChar;
			acc.currentChar = char;
			acc.count = 1;
		}
		return acc;
	},
	{ currentChar: charList[0], count: 0, result: "" },
);

console.log(acc.result + acc.count + acc.currentChar);

// charList.forEach(char => {
//   uniqueCharsMap.set(char, uniqueCharsMap.get(char) + 1);
// });

// uniqueCharsMap.forEach((value,key) => {
//   result += value
//   result += key
// })

// console.log(result)

// console.log(uniqueCharsMap)
