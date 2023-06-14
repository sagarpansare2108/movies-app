import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer
} from 'react';
import useDebounce from '../hooks/useDebounce';
import { Movie } from '../models';
import MoviesService from '../services/MoviesService';

export const SET_MOVIES = 'SET_MOVIES';
export const ADD_MOVIES = 'ADD_MOVIES';
export const SET_CATEGORY = 'SET_CATEGORY';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_QUERY = 'SET_QUERY';
export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';

export interface MoviesContextType {
  movies: Movie[];
  category: string;
  query: string;
  isLoading: boolean;
  isCategoryLoading: boolean;
  totalPages: number;
  page: number;
  error: any;
  isSearch: boolean
}

export const MoviesContext = createContext<MoviesContextType>(
  {} as MoviesContextType
);
export const MoviesDispatchContext = createContext<any>(null);

type MoviesAction =
  | { type: typeof SET_MOVIES; movies: Movie[]; totalPages: number }
  | { type: typeof ADD_MOVIES; movies: Movie[]; totalPages: number }
  | { type: typeof SET_CATEGORY; category: string }
  | { type: typeof SET_CURRENT_PAGE; page: number }
  | { type: typeof SET_QUERY; query: string }
  | { type: typeof SET_TOTAL_PAGES; totalPages: number }
  | { type: typeof SET_ERROR; error: string }
  | { type: typeof SET_LOADING; isLoading: boolean };

const moviesReducer = (state: MoviesContextType, action: MoviesAction) => {
  switch (action.type) {
    case SET_MOVIES:
      return {
        ...state,
        movies: action.movies,
        totalPages: action.totalPages,
        isLoading: false,
        isCategoryLoading: false
      };
    case ADD_MOVIES:
      const moviesList = [...state.movies, ...action.movies];
      const uniqueMovieIds = new Map();
      const movies = [];
      for (const movie of moviesList) {
        const id = movie.id;
        if (!uniqueMovieIds.has(id)) {
          uniqueMovieIds.set(id, true);
          movies.push(movie);
        }
      }
      return {
        ...state,
        movies: movies,
        totalPages: action.totalPages,
        isLoading: false
      };
    case SET_CATEGORY:
      return {
        ...state,
        page: 1,
        query: '',
        category: action.category,
        isCategoryLoading: !state.isCategoryLoading && true || false,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        page: action.page
      };
    case SET_QUERY:
      return {
        ...state,
        page: 1,
        query: action.query
      };
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.totalPages
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      };
    default:
      return state;
  }
};

const initialState: MoviesContextType = {
  movies: [],
  category: '/popular',
  query: '',
  isLoading: true,
  isCategoryLoading: true,
  totalPages: 1,
  page: 1,
  error: null,
  isSearch: false
};

export function MoviesProvider({ children }: { children: ReactNode }): any {
  const [state, dispatch] = useReducer(moviesReducer, initialState);
  const query = useDebounce(state.query);

  useEffect(() => {
    const controller = new AbortController();

    getMovies({ controller });

    return () => {
      controller.abort();
    };
  }, [state.page, state.category, query]);

  async function getMovies({ controller }: { controller: AbortController }) {
    dispatch({ type: SET_LOADING, isLoading: true });
    try {
      const response = await MoviesService.getMovies(
        {
          category: state.category,
          page: state.page,
          query: state.query
        },
        controller
      );
      dispatch({
        type: state.page > 1 ? ADD_MOVIES : SET_MOVIES,
        movies: response?.movies || [],
        totalPages: response?.totalPages || 0
      });
    } catch (error: any) {
      dispatch({ type: SET_ERROR, error: error?.message || '' });
    } finally {
      dispatch({ type: SET_LOADING, isLoading: false });
    }
  }

  const value = useMemo(() => {
    return {
      ...state
    };
  }, [state]);

  return (
    <MoviesContext.Provider value={value}>
      <MoviesDispatchContext.Provider value={dispatch}>
        {children}
      </MoviesDispatchContext.Provider>
    </MoviesContext.Provider>
  );
}
