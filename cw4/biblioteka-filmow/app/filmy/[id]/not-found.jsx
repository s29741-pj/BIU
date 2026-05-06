import Link from "next/link";

export default function NotFound() {
	return (
		<div>
			<p>Film nie został znaleziony.</p>
			<Link href='/filmy'>Wróć do listy filmów</Link>
		</div>
	);
}
