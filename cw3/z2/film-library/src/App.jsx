import "./App.css";
import FilmList from "../components/FilmList";

const FILMS = [
	{
		id: 1,
		title: "Oppenheimer",
		year: 2023,
		genre: "Dramat",
		rating: 5,
		watched: true,
	},
	{
		id: 2,
		title: "Dune: Część druga",
		year: 2024,
		genre: "Sci-Fi",
		rating: 4,
		watched: false,
	},
	{
		id: 3,
		title: "Past Lives",
		year: 2023,
		genre: "Romans",
		rating: 5,
		watched: true,
	},
	{
		id: 4,
		title: "Poor Things",
		year: 2023,
		genre: "Komedia",
		rating: 4,
		watched: false,
	},
];

function App() {
  const watched = FILMS.filter(film => film.watched === true)
  const unwatched = FILMS.filter(film => film.watched === false)


	return <>
    <FilmList title={"Obejrzane"} films={watched} />
    <FilmList title={"Do obejrzenia"} films={unwatched} />
  
  </>;
}

export default App;
