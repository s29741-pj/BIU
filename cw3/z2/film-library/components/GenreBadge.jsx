const BADGES = new Map([
	["Dramat", "#c0392b"],
	["Sci-Fi", "#2980b9"],
	["Romans", "#e91e8c"],
	["Komedia", "#f39c12"],
	["Other", "#7f8c8d"],
]);

function colorPicker({ genre }) {
	return BADGES.get(genre) ?? BADGES.get("Other");
}

function GenreBadge({ genre }) {
	return <span style={{ color: colorPicker({ genre }) }}>{genre}</span>;
}

export default GenreBadge;
