function RatingStars({stars}) {
	return (
		<span>
			{[...Array(5)].map((_, i) =>
				i < stars ? (
					<i key={i} className='fa-solid fa-star'></i>
				) : (
					<i key={i} className='fa-regular fa-star'></i>
				),
			)}
		</span>
	);
}
export default RatingStars;
