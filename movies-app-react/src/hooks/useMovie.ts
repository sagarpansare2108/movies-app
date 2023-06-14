import { useContext } from 'react';
import { MovieContext, MovieDispatchContext, MovieContextType } from '../contexts/MovieContext';

export function useMovie(): MovieContextType {
    return useContext(MovieContext);
}

export function useMovieDispatch(): any {
    return useContext(MovieDispatchContext);
}