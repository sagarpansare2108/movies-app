import { useContext } from "solid-js";
import { MovieContext, IMovieContextType } from "../contexts/MovieContext";

export function useMovie(): IMovieContextType {
    return useContext(MovieContext);
}