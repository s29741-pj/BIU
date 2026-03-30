const lines = require("fs")
	.readFileSync("/dev/stdin", "utf8")
	.trim()
	.split("\n");
// TODO

function topStudents(arr) {
	const [students_num, tests, topk] = arr[0].split(" ").map(Number);
	const weights = arr[1].split(" ").map(Number);
	const pass = arr[2];

	const students_list = new Map(
		arr.slice(3).map(line => {
			const [name, ...scores] = line.split(" ");
			return [name, scores.map(Number)];
		}),
	);

	const filtered_students_list = new Map(
		[...students_list]
			.filter(([key, scores]) => scores.every(score => score > pass))
			.map(([key, scores]) => {
				const weighted = scores.reduce(
					(sum, score, index) => sum + score * weights[index],
					0,
				);
				return [key, weighted];
			})
			.sort(([keyA, avgA], [keyB, avgB]) => avgB - avgA)
			.sort(([keyA, avgA], [keyB, avgB]) => {
				if (avgB === avgA) {
					return keyA.localeCompare(keyB); // porównanie stringów alfabetycznie
				}
				return avgB - avgA;
			}),
	);

	if (filtered_students_list.size > 0) {
		[...filtered_students_list]
			.slice(0, topk)
			.forEach(([key, value]) => console.log(key, value.toFixed(2)));
	} else {
		console.log("brak");
	}
}

topStudents(lines);
