

const initialFilmState = {
    films: [],           // pusta tablica — brak filmów na start
    loading: false,      // nie ładuje na start
    error: null,         // brak błędu na start
    query: "",           // puste wyszukiwanie na start
    favorites: [],       // brak ulubionych na start
    notifications: [],   // brak powiadomień na start
};

function filmReducer(state = initialFilmState, action) {
    switch (action.type) {

        case 'FETCH_START':
            return {
                ...state,
                loading: true,
                error: null,
            }


        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                films: action.payload,
            }


        case 'FETCH_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            }

        case 'SET_QUERY':
            return {
                ...state,
                query: action.payload,
            }

        case 'TOGGLE_FAVORITE':
            const filmId = action.payload;
            const isFavorite = state.favorites.includes(filmId);
            return {
                ...state,
                favorites: isFavorite
                    ? state.favorites.filter(id => id !== filmId) // usuń z ulubionych
                    : [...state.favorites, filmId], // dodaj do ulubionych
            }

        case 'ADD_FILM':
            return {
                ...state,
                films: [...state.films, action.payload],
            }


        case 'ADD_NOTIFICATION':
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    { id: Date.now(), message: action.payload.message, type: action.payload.type }
                ],
            }

        case 'DISMISS_NOTIFICATION':
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notification) => notification.id !== action.payload
                ),
            }

        default:
            if (action.type) throw new Error(`Nieznana akcja: ${action.type}`);
            return state;
    }
}

export { filmReducer, initialFilmState }
