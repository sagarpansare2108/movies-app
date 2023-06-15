import { useContext } from "solid-js";
import { MoviesContext } from "../contexts/MoviesContext";

export function useMovies(): any {
    return useContext(MoviesContext);
}