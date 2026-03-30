import GenreBadge from "./GenreBadge";
import RatingStars from "./RatingStars";
import WatchedBadge from "./WatchedBadge";

function FilmCard({ title, year, genre, rating, watched }) {
	return (
		<div className='film-card'>
			<div className='film-header'>
				<h3 className='film-title'>{title}</h3>
				{console.log("render:", title)}
				<span className='film-year'>({year})</span>
			</div>
			<div className='film-details'>
				<GenreBadge genre={genre} />
				<RatingStars stars={rating} />
			</div>
			<WatchedBadge watched={watched} />
		</div>
	);
}

export default FilmCard;
