import { notFound } from "next/navigation";
import FavoriteButton from "@/components/FavoriteButton";

export default async function FilmPage({ params }) {
	const { id } = await params;

	const response = await fetch(`http://localhost:3000/api/filmy`, {
		cache: "no-store",
	});
	const films = await response.json();
	const film = films.find(f => f.id === Number(id));

	if (!film) notFound();

	return (
		<div>
			<FavoriteButton />
			<ul>
				<li>Id: {film.id}</li>
				<li>Tytuł: {film.title}</li>
				<li>Rok: {film.year}</li>
				<li>Gatunek: {film.genre}</li>
			</ul>
		</div>
	);
}
