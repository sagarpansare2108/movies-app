import { useContext } from "solid-js";
import { MoviesContext, IMoviesContextType } from "../contexts/MoviesContext";

export function useMovies(): IMoviesContextType {
    return useContext(MoviesContext);
}