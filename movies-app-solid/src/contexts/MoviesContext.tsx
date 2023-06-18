import {
  createSignal,
  createContext,
  JSX,
  onCleanup,
  createMemo,
  batch,
  Accessor,
  Setter,
  createEffect,
  untrack,
} from 'solid-js';
import MoviesService from '../services/MoviesService';
import { Movie } from '../models';
import { useParams } from '@solidjs/router';
import useDebounce from '../hooks/useDebounce';

export interface IMoviesContextType {
  query: Accessor<string>;
  page: Accessor<number>;
  movies: Accessor<Movie[]>;
  totalPages: Accessor<number>;
  isLoading: Accessor<boolean>;
  error?: Accessor<any>;
  setQuery: (query: string) => void;
  loadMore: () => void;
}

export const MoviesContext = createContext<IMoviesContextType>({} as IMoviesContextType);

export function MoviesProvider(props: { children: JSX.Element }) {
  const params = useParams<{ category: string }>();
  const [selectedCategory, setSelectedCategory] = createSignal<string>('');
  const category = createMemo(() => {
    return !(params as any).id && `/${params.category || 'popular'}` || selectedCategory && selectedCategory();
  });

  const [movies, setMovies] = createSignal<Movie[]>([]);
  const [totalPages, setTotalPages] = createSignal<number>(1);
  const [query, setQuery] = createSignal<string>('');
  const [page, setPage] = createSignal<number>(1);
  const [isLoading, setLoading] = createSignal<boolean>(false);
  const [error, setError] = createSignal<any>(null);

  const setDebounceQuery = useDebounce(setQuery, 500);

  const fetchMovies = async ({ controller }: { controller: AbortController }) => {
    console.log('category ', category());
    if (category()) {
      setLoading(true);
      try {
        const response = await MoviesService.getMovies({
          category: category(), page: page(), query: query()
        }, controller);
        batch(() => {
          setMovies((movies: Movie[]) => {
            return page() > 1 ? [...movies, ...response?.movies] : response?.movies;
          });
          setTotalPages(response?.totalPages);
        })
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  }

  createEffect(() => {
    const currentCategory = category();
    const prevCategory = untrack(() => selectedCategory());
    if (currentCategory !== '' && currentCategory !== prevCategory) {
      batch(() => {
        setSelectedCategory(currentCategory);
        setQuery('');
        setPage(1);
      });
    }
  });

  createEffect(() => {
    if (query()) {
      setPage(1);
    }
  })

  createEffect(() => {
    const controller = new AbortController();

    fetchMovies({ controller });

    onCleanup(() => {
      controller.abort();
    });
  });

  const loadMore = () => {
    if (page() < totalPages()) {
      setPage((page) => page + 1);
    }
  }

  const value: IMoviesContextType = {
    movies,
    totalPages,
    query,
    page,
    isLoading,
    error,
    setQuery: setDebounceQuery,
    loadMore
  };

  return (
    <MoviesContext.Provider value={value}>
      {props.children}
    </MoviesContext.Provider>
  );
}
