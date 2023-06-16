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
import { useLocation, useParams } from '@solidjs/router';

export const MoviesContext = createContext();

export function MoviesProvider(props: { children: JSX.Element }) {
  const [query, setQuery] = createSignal<string>('');
  // const [loading, setLoading] = createSignal<boolean>(false);
  // const [movies, setMovies] = createSignal<Movie[]>([]);
  const [error, setError] = createSignal<any>();

  // const location = useLocation();
  const params = useParams<{category: string}>();
  // const pathname = createMemo(() => location.pathname);
  const category = createMemo(() => `/${params.category || 'popular'}` );

  // createEffect(() => {
  //   console.warn(category());
  //   setLoading(true);
  //   MoviesService.getMovies({ category: `/${category()}`, page: 1 })
  //     .then((response) => {
  //       batch(() => {
  //         setMovies(response?.movies);
  //         setTotalPages(response?.totalPages);
  //       });
  //     })
  //     .catch((e) => {
  //       setError(e);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // });

  const [data, { refetch }] = createResource(category, async (category) => {
    try {
      return await MoviesService.getMovies({ category, page: 1 });
    } catch(error) {
      setError(error);
    }
  });

  createEffect(() => {
    console.log(data());
    console.log(data.loading);
    console.log(error());
  })

  const movies = createMemo(() => data()?.movies);
  const totalPages = createMemo(() => data()?.totalPages);
  const loading = createMemo(() => data.loading);

  const value: any = {
    category,
    query,
    setQuery,
    movies,
    loading,
    totalPages,
    error
  };
  return (
    <MoviesContext.Provider value={value}>
      {props.children}
    </MoviesContext.Provider>
  );
}
