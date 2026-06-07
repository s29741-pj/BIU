'use client';


import { createContext, useContext, useReducer, useEffect } from "react";
import { filmReducer, initialFilmState } from "../reducers/filmReducer";



const FilmStateContext = createContext();
const FilmDispatchContext = createContext();




function useFilmState() {
    const context = useContext(FilmStateContext);
    if (context === undefined) {
        throw new Error('useFilmState must be used within a FilmProvider');
    }
    return context;
}

function useFilmDispatch() {
    const context = useContext(FilmDispatchContext);
    if (context === undefined) {
        throw new Error('useFilmDispatch must be used within a FilmProvider');
    }
    return context;
}


export function FilmProvider({ children }) {

    const [state, dispatch] = useReducer(filmReducer, initialFilmState);


    useEffect(() => {
        let cancelled = false;
        dispatch({ type: 'FETCH_START' });
        fetch('/api/filmy')
            .then(res => res.json())
            .then(data => {
                if (!cancelled) dispatch({ type: 'FETCH_SUCCESS', payload: data });
            })
            .catch(err => {
                if (!cancelled) dispatch({ type: 'FETCH_ERROR', payload: err.message });
            });
        return () => { cancelled = true; };
    }, []);

    return (
        <FilmStateContext.Provider value={state}>
            <FilmDispatchContext.Provider value={dispatch}>
                {children}
            </FilmDispatchContext.Provider>
        </FilmStateContext.Provider>
    );


}

export { FilmStateContext, FilmDispatchContext, useFilmState, useFilmDispatch }
