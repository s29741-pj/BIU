"use client";

import useFetch from "../../hooks/useFetch";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

export default function FilmsPage() {
	const [refreshKey, setRefreshKey] = useState(0);
	const searchRef = useRef(null);
	const [query, setQuery] = useState("");
	const { data, loading, error } = useFetch(`/api/filmy?v=${refreshKey}`);
	const filtered =
		data?.filter(film =>
			film.title.toLowerCase().includes(query.toLowerCase()),
		) ?? [];

	useEffect(() => {
		searchRef.current?.focus();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p role='alert'>Error: {error}</p>;

	return (
		<main className='container'>
			<Link href='/'>
				<button className='back-button'>← Powrót do Głównej</button>
			</Link>

			<div className='section'>
				<h1>🎬 Moje Filmy</h1>
				<p>
					Razem filmów: <strong>{data?.length ?? 0}</strong>
				</p>
			</div>

			<div className='section'>
				<input
					ref={searchRef}
					type='text'
					value={query}
					onChange={e => setQuery(e.target.value)}
					placeholder='Wyszukaj film...'
				/>
				<div style={{ display: "flex", gap: "0.5rem" }}>
					<button onClick={() => setRefreshKey(prev => prev + 1)}>
						🔄 Odśwież
					</button>
					<Link href='/filmy/dodaj'>
						<button>➕ Dodaj Film</button>
					</Link>
				</div>
			</div>

			<div className='section'>
				{filtered.length === 0 ? (
					<p>Brak filmów spełniających kryteria wyszukiwania.</p>
				) : (
					<>
						<p style={{ marginBottom: "1rem", color: "#666" }}>
							Wyniki: {filtered.length} film{filtered.length !== 1 ? "y" : ""}
						</p>
						{filtered.map(film => (
							<div key={film.id} className='film-item'>
								<Link href={`/filmy/${film.id}`}>
									<strong>{film.title}</strong>
									<span style={{ marginLeft: "0.5rem", color: "#999" }}>
										({film.year})
									</span>
								</Link>
							</div>
						))}
					</>
				)}
			</div>
		</main>
	);
}
