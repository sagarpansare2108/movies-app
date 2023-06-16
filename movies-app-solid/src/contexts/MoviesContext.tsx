import {
  createSignal,
  createContext,
  JSX,
  createResource,
  createEffect,
  onCleanup,
  createMemo,
  batch
} from 'solid-js';
import MoviesService from '../services/MoviesService';
import { Movie, Movies } from '../models';
import { useLocation } from '@solidjs/router';

export const MoviesContext = createContext();

export function MoviesProvider(props: { children: JSX.Element }) {
  const [query, setQuery] = createSignal<string>('');
  const [category, setCategory] = createSignal<string>('/popular');
  const [loading, setLoading] = createSignal<boolean>(false);
  const [movies, setMovies] = createSignal<Movie[]>([]);
  const [totalPages, setTotalPages] = createSignal<number>(1);
  const [error, setError] = createSignal<any>();

  const location = useLocation();
  const pathname = createMemo(() => location.pathname);

  createEffect((prevCategory: any) => {
    console.warn(pathname());
    // console.log('category ', prevCategory, category());
    // if (prevCategory !== category()) {
    //   setData(null);
    // }
    const category = pathname() === '/' ? '/popular' : pathname();
    setLoading(true);
    MoviesService.getMovies({ category, page: 1 })
      .then((response) => {
        batch(() => {
          setMovies(response?.movies);
          setTotalPages(response?.totalPages);
        });
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
    return category;
  }, '');

  // const [data, { refetch }] = createResource(category, async (category) => {
  //   return await MoviesService.getMovies({ category, page: 1 });
  // });

  const value: any = {
    category,
    setCategory,
    query,
    setQuery,
    loading,
    movies,
    totalPages,
    error
  };
  return (
    <MoviesContext.Provider value={value}>
      {props.children}
    </MoviesContext.Provider>
  );
}
