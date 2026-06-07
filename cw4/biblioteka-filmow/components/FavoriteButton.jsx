"use client";

import { useFilmState, useFilmDispatch } from "@/context/FilmContext";

export default function FavoriteButton({ filmId }) {
    const state = useFilmState();
    const dispatch = useFilmDispatch();
    const isFavorite = state.favorites.includes(filmId);

    function handleClick() {
        dispatch({ type: 'TOGGLE_FAVORITE', payload: filmId });
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
                message: isFavorite ? 'Usunięto z ulubionych' : 'Dodano do ulubionych',
                type: 'success',
            }
        });
    }

    return (
        <button onClick={handleClick}>
            {isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        </button>
    );
}