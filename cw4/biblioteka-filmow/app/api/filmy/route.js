import { NextResponse } from "next/server";
import { filmSchema } from "@/lib/filmSchema";

let films = [
	{ id: 1, title: "Oppenheimer", year: 2023, genre: "Dramat" },
	{ id: 2, title: "Dune: Czesc druga", year: 2024, genre: "Sci-Fi" },
	{ id: 3, title: "Past Lives", year: 2023, genre: "Romans" },
	{ id: 4, title: "Poor Things", year: 2023, genre: "Komedia" },
];

export async function GET() {
	return NextResponse.json(films);
}

export async function POST(request) {
	const body = await request.json();
	try {
		const parsed = filmSchema.parse(body);
		const newFilm = { id: Date.now(), ...parsed };
		films.push(newFilm);
		return NextResponse.json(newFilm, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ fieldErrors: error.flatten().fieldErrors },
			{ status: 400 },
		);
	}
}
