import FilmCard from "./FilmCard";

function FilmList({ title, films }) {
	return (
		<>
			<h1>{title}</h1>
			{films.map(film => (
				<FilmCard
					key={film.id}
					title={film.title}
					year={film.year}
					genre={film.genre}
					rating={film.rating}
					watched={film.watched}
				/>
			))}
		</>
	);
}

export default FilmList;
