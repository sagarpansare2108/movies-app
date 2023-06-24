import { useContext } from '@builder.io/qwik';
import { MoviesContext, IMoviesContextType } from "../contexts/MoviesContext";

export function useMovies(): IMoviesContextType {
    return useContext(MoviesContext);
}