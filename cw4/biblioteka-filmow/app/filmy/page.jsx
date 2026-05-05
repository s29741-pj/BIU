"use client";

import useFetch from "../hooks/useFetch";
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
		searchRef.current?.focus(); // 3. po zamontowaniu wywołujesz focus()
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p role='alert'>Error: {error}</p>;

	return (
		<div>
			<button onClick={() => setRefreshKey(prev => prev + 1)}>Odśwież</button>
			<input
				ref={searchRef}
				type='text'
				value={query}
				onChange={e => setQuery(e.target.value)}
			/>
			{filtered.map(film => (
				<Link key={film.id} href={`/filmy/${film.id}`}>
					{film.title} ({film.year}) — {film.genre}
				</Link>
			))}
		</div>
	);
}
