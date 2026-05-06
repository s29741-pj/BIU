// app/filmy/[id]/FilmDetails.jsx

"use client";

import { notFound } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import FavoriteButton from "@/components/FavoriteButton";

export default function FilmDetails({ id }) {
	const { data, loading, error } = useFetch("/api/filmy");

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Błąd: {error}</p>;

	const film = data?.find(f => f.id === Number(id));
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
