import Link from "next/link";

export default function Home() {
	return (
		<main className='container'>
			<div className='section'>
				<h1>📽️ Biblioteka Filmów</h1>
				<p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
					Witaj w aplikacji do zarządzania Twoją kolekcją filmów.
				</p>
			</div>

			<div className='section'>
				<h2 className='section-title'>🎬 Moje Filmy</h2>
				<p>Przeglądaj, dodawaj i zarządzaj swoimi ulubionymi filmami.</p>
				<Link href='/filmy'>
					<button style={{ marginTop: "1rem" }}>Przejdź do Filmów</button>
				</Link>
			</div>

			<div className='section'>
				<h2 className='section-title'>➕ Dodaj Film</h2>
				<p>Dodaj nowy film do Twojej kolekcji.</p>
				<Link href='/filmy/dodaj'>
					<button style={{ marginTop: "1rem" }}>Dodaj Nowy Film</button>
				</Link>
			</div>
		</main>
	);
}
