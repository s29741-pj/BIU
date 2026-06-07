import { notFound } from "next/navigation";
import Link from "next/link";
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
		<main className='container'>
			<Link href='/filmy'>
				<button className='back-button'>← Powrót do Filmów</button>
			</Link>

			<div className='section'>
				<h1>{film.title}</h1>
				<p
					style={{
						fontSize: "0.95rem",
						color: "#666",
						marginBottom: "1.5rem",
					}}>
					ID: {film.id}
				</p>
			</div>

			<div
				className='section'
				style={{
					backgroundColor: "var(--button-bg)",
					padding: "1.5rem",
					borderRadius: "4px",
				}}>
				<div style={{ marginBottom: "1rem" }}>
					<p style={{ marginBottom: "0.5rem" }}>
						<strong>📅 Rok:</strong> {film.year}
					</p>
					<p style={{ marginBottom: "0.5rem" }}>
						<strong>🎭 Gatunek:</strong> {film.genre}
					</p>
				</div>
				<div style={{ marginBottom: "1rem" }}>
					<FavoriteButton filmId={film.id} />
				</div>
			</div>

			<div className='section'>
				<Link href='/filmy'>
					<button>← Powrót do Listy Filmów</button>
				</Link>
			</div>
		</main>
	);
}
