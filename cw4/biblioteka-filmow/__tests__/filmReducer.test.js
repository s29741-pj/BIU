import { filmReducer, initialFilmState } from '../reducers/filmReducer';


describe('filmReducer', () => {
    const stateWithFilms = {
        ...initialFilmState,
        films: [
            { id: 1, title: "Inception", year: 2010, genre: "Sci-Fi" },
            { id: 2, title: "The Matrix", year: 1999, genre: "Sci-Fi" },
            { id: 3, title: "Past Lives", year: 2023, genre: "Dramat" },
            { id: 4, title: "Oppenheimer", year: 2024, genre: "Biograficzny" }
        ]

    }
    test('should return the initial state', () => {
        expect(filmReducer(undefined, {})).toEqual(initialFilmState);
    });
    test('should handle FETCH_START', () => {
        const fetchStartAction = { type: 'FETCH_START' }; const expectedState = { ...initialFilmState, loading: true, error: null }; expect(filmReducer(initialFilmState, fetchStartAction)).toEqual(expectedState);
    });
    test('should handle FETCH_SUCCESS', () => {
        const filmsData = [
            { id: 1, title: "Film 1", year: 2023, genre: "Dramat" },
            { id: 2, title: "Film 2", year: 2024, genre: "Sci-Fi" }
        ];
        const fetchSuccessAction = { type: 'FETCH_SUCCESS', payload: filmsData };
        const expectedState = { ...initialFilmState, loading: false, films: filmsData };
        expect(filmReducer(initialFilmState, fetchSuccessAction)).toEqual(expectedState);
    });

    test('should handle FETCH_ERROR', () => {
        const errorMessage = "Błąd podczas pobierania filmów"; 
        const fetchErrorAction = { type: 'FETCH_ERROR', payload: errorMessage }; 
        const expectedState = { ...initialFilmState, loading: false, error: errorMessage }; 
        expect(filmReducer(initialFilmState, fetchErrorAction)).toEqual(expectedState);
    });
    test('should handle SET_QUERY', () => {
        const query = "Oppenheimer"; 
        const setQueryAction = { type: 'SET_QUERY', payload: query }; 
        const expectedState = { ...initialFilmState, query }; 
        expect(filmReducer(initialFilmState, setQueryAction)).toEqual(expectedState);
    });
    test('should handle TOGGLE_FAVORITE - add to favorites', () => {
        const toggleFavoriteAction = { type: 'TOGGLE_FAVORITE', payload: 1 }; 
        const expectedState = { ...initialFilmState, favorites: [1] }; 
        expect(filmReducer(initialFilmState, toggleFavoriteAction)).toEqual(expectedState);
    });
    test('should handle TOGGLE_FAVORITE - remove from favorites', () => {
        const stateWithFavorite = { ...initialFilmState, favorites: [1] }; 
        const toggleFavoriteAction = { type: 'TOGGLE_FAVORITE', payload: 1 }; 
        const expectedState = { ...initialFilmState, favorites: [] }; 
        expect(filmReducer(stateWithFavorite, toggleFavoriteAction)).toEqual(expectedState);
    });
    test('should handle ADD_NOTIFICATION', () => {
        const notificationMessage = "Nowy film dodany do biblioteki"; 
        const notificationType = "success"; 
        const addNotificationAction = { type: 'ADD_NOTIFICATION', payload: { message: notificationMessage, type: notificationType } }; 
        const expectedState = { ...initialFilmState, notifications: [{ id: expect.any(Number), message: notificationMessage, type: notificationType }] }; 
        expect(filmReducer(initialFilmState, addNotificationAction)).toEqual(expectedState);
    });
    test('should handle DISMISS_NOTIFICATION', () => {
        const initialStateWithNotification = { ...initialFilmState, notifications: [{ id: 1, message: "Test notification", type: "info" }] }; 
        const dismissNotificationAction = { type: 'DISMISS_NOTIFICATION', payload: 1 }; 
        const expectedState = { ...initialFilmState, notifications: [] }; 
        expect(filmReducer(initialStateWithNotification, dismissNotificationAction)).toEqual(expectedState);
    });
    test('should handle ADD_FILM', () => {
        const newFilm = { id: 5, title: "Nowy Film", year: 2024, genre: "Akcja" };
        const addAction = { type: 'ADD_FILM', payload: newFilm };
        const expectedState = { ...stateWithFilms, films: [...stateWithFilms.films, newFilm] };
        expect(filmReducer(stateWithFilms, addAction)).toEqual(expectedState);
    });

    test('should throw error for unknown action type', () => {
        const unknownAction = { type: 'UNKNOWN_ACTION' };
        expect(() => filmReducer(stateWithFilms, unknownAction)).toThrow('Nieznana akcja: UNKNOWN_ACTION');
    });

});