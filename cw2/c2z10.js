const n = Number(lines[0]);

const nodes = lines.slice(1, n + 1).map(line => {
	const [id, parentId, value] = line.split(" ").map(Number);
	return { id, parentId, value };
});

const children = Object.fromEntries(nodes.map(n => [n.id, []]));
const values = Object.fromEntries(nodes.map(n => [n.id, n.value]));

nodes.forEach(n => {
	if (n.parentId !== 0) children[n.parentId].push(n.id);
});

const calcDepths = (id, depth, acc) => {
	acc[depth] = (acc[depth] || 0) + values[id];
	return children[id].reduce(
		(a, childId) => calcDepths(childId, depth + 1, a),
		acc,
	);
};

const root = nodes.find(n => n.parentId === 0);
const depthSums = calcDepths(root.id, 0, {});

const maxDepth = Math.max(...Object.keys(depthSums).map(Number));
Array.from({ length: maxDepth + 1 }, (_, i) => i).forEach(d =>
	console.log(`${d} ${depthSums[d]}`),
);
