import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react';
import { Movie, Review, Trailer } from '../models';
import MoviesService from '../services/MoviesService';
import { useParams } from 'react-router-dom';

export const SET_MOVIE = 'SET_MOVIE';
export const SET_MOVIE_REVIEWS = 'SET_MOVIE_REVIEWS';
export const SET_MOVIE_TRAILERS = 'SET_MOVIE_TRAILERS';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';
export const SET_REVIES_LOADING = 'SET_REVIES_LOADING';
export const SET_TRAILERS_LOADING = 'SET_TRAILERS_LOADING';

export interface IMovieState {
  movie: Movie | null;
  reviews: Review[];
  trailers: Trailer[];
  error: any;
  isLoading: boolean;
  isReviewsLoading: boolean;
  isTrailersLoading: boolean;
}

export interface MovieContextType extends IMovieState {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export const MovieContext = createContext<MovieContextType>({} as MovieContextType);
export const MovieDispatchContext = createContext<any>(null);

type MovieAction =
  | { type: typeof SET_MOVIE; movie: Movie | null }
  | { type: typeof SET_MOVIE_REVIEWS; reviews: Review[] }
  | { type: typeof SET_MOVIE_TRAILERS; trailers: Trailer[] }
  | { type: typeof SET_ERROR; error: string }
  | { type: typeof SET_LOADING; isLoading: boolean }
  | { type: typeof SET_REVIES_LOADING; isLoading: boolean }
  | { type: typeof SET_TRAILERS_LOADING; isLoading: boolean };

const movieReducer = (state: IMovieState, action: MovieAction) => {
  switch (action.type) {
    case SET_MOVIE:
      return {
        ...state,
        movie: action.movie,
        isLoading: false
      };
    case SET_MOVIE_REVIEWS:
      return {
        ...state,
        reviews: action.reviews,
        isLoading: false
      };
    case SET_MOVIE_TRAILERS:
      return {
        ...state,
        trailers: action.trailers,
        isLoading: false
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
    case SET_REVIES_LOADING:
      return {
        ...state,
        isReviewsLoading: action.isLoading
      };
    case SET_TRAILERS_LOADING:
      return {
        ...state,
        isTrailersLoading: action.isLoading
      };
    default:
      return state;
  }
};

const initialState: IMovieState = {
  movie: null,
  reviews: [],
  trailers: [],
  isLoading: true,
  isReviewsLoading: true,
  isTrailersLoading: true,
  error: null
};

export function MovieProvider({ children }: { children: ReactNode }): any {
  const params = useParams();
  const { id } = params;

  const [state, dispatch] = useReducer(movieReducer, initialState);

  const [selectedTab, setSelectedTab] = useState('reviews');

  useEffect(() => {
    const controller = new AbortController();
    id && getMovie({ controller });
    return () => {
      controller.abort();
    };
  }, [id]);

  useEffect(() => {
    const controller = new AbortController();
    id && selectedTab === 'reviews' && getMovieReviews({ controller });
    id && selectedTab === 'trailers' && getMovieTrailers({ controller });
    return () => {
      controller.abort();
    };
  }, [id, selectedTab]);

  async function getMovie({ controller }: { controller: AbortController }) {
    dispatch({ type: SET_LOADING, isLoading: true });
    try {
      const movie = await MoviesService.getMovieById(
        {
          id: id
        },
        controller
      );
      console.log(movie);
      dispatch({
        type: SET_MOVIE,
        movie: movie || null
      });
    } catch (error: any) {
      dispatch({ type: SET_ERROR, error: error?.message || '' });
    } finally {
      dispatch({ type: SET_LOADING, isLoading: false });
    }
  }

  async function getMovieReviews({
    controller
  }: {
    controller: AbortController;
  }) {
    dispatch({ type: SET_REVIES_LOADING, isLoading: true });
    try {
      const reviews = await MoviesService.getReviewsById(
        {
          id: id
        },
        controller
      );
      dispatch({
        type: SET_MOVIE_REVIEWS,
        reviews: reviews
      });
    } catch (error: any) {
      dispatch({ type: SET_ERROR, error: error?.message || '' });
    } finally {
      dispatch({ type: SET_REVIES_LOADING, isLoading: false });
    }
  }

  async function getMovieTrailers({
    controller
  }: {
    controller: AbortController;
  }) {
    dispatch({ type: SET_REVIES_LOADING, isLoading: true });
    try {
      const trailers = await MoviesService.getTrailersById(
        {
          id: id
        },
        controller
      );
      dispatch({
        type: SET_MOVIE_TRAILERS,
        trailers: trailers
      });
    } catch (error: any) {
      dispatch({ type: SET_ERROR, error: error?.message || '' });
    } finally {
      dispatch({ type: SET_REVIES_LOADING, isLoading: false });
    }
  }

  const value = useMemo(() => {
    return {
      ...state,
      selectedTab,
      setSelectedTab
    };
  }, [state, selectedTab, setSelectedTab]);

  return (
    <MovieContext.Provider value={value}>
      <MovieDispatchContext.Provider value={dispatch}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieContext.Provider>
  );
}
