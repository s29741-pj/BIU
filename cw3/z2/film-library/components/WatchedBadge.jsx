function WatchedBadge({ watched }) {
	if (!watched) return null;
	return <p className='watched-badge'>✓ Obejrzany</p>;
}

export default WatchedBadge;
