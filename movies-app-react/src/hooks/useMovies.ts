import { useContext } from 'react';
import { MoviesContext, MoviesDispatchContext, MoviesContextType } from '../contexts/MoviesContext';

export function useMovies(): MoviesContextType {
  return useContext(MoviesContext);
}

export function useMoviesDispatch(): any {
  return useContext(MoviesDispatchContext);
}