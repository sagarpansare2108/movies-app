import {
  $,
  type Signal,
  component$,
  useSignal,
  Slot,
  useTask$,
  noSerialize,
  useVisibleTask$
} from '@builder.io/qwik';
import { useContextProvider, createContextId } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { Movie } from '~/models';
import MoviesService from '~/services/movies_service';

export interface IMoviesContextType {
  query: Signal<string>;
  page?: Signal<number>;
  movies?: Signal<Movie[]>;
  totalPages?: Signal<number>;
  isLoading?: Signal<boolean>;
  error?: Signal<any>;
  setCategory?: (value: string) => void;
  setQuery?: (value: string) => void;
  loadMore?: () => void;
}

export const MoviesContext =
  createContextId<IMoviesContextType>('movies-context');

export const MoviesProvider = component$<{
  data: any;
}>(({ data }) => {
  const location = useLocation();
  const category = useSignal(
    `/${(location.params && location.params.category) || 'popular'}`
  );
  const cat = `/${(location.params && location.params.category) || 'popular'}`;

  const query = useSignal<string>('');
  const debouncedQuery = useSignal<string>('');
  // const movies = useSignal<Movie[]>(data.movies || []);
  // const totalPages = useSignal<number>(data.totalPages || 1);
  const movies = useSignal<Movie[]>([]);
  const totalPages = useSignal<number>(1);
  const page = useSignal<number>(1);
  const isLoading = useSignal<boolean>(false);
  const error = useSignal<any>();

  const isSSR = useSignal(false);

  useTask$(({ track, cleanup }) => {
    track(() => query.value);

    const debouncedTimer = setTimeout(() => {
      debouncedQuery.value = query.value;
    }, 1000);

    cleanup(() => clearTimeout(debouncedTimer));
  });

  const setCategory = $((value: string) => {
    category.value = value;
  });

  const setQuery = $((value: string) => {
    query.value = value;
  });

  const setLoading = $((value: boolean) => {
    isLoading.value = value;
  });

  const fetchMovies = $(
    async ({ controller }: { controller: AbortController }) => {
      if (category.value) {
        setLoading(true);
        try {
          const response = await MoviesService.getMovies(
            {
              category: category.value,
              page: page.value,
              query: query.value
            },
            controller
          );

          // console.log('response ', movies.value, response.movies);

          movies.value =
            page.value > 1
              ? [...movies.value, ...response.movies]
              : response.movies;

          // console.log('response ', movies.value);

          totalPages.value = response?.totalPages;
        } catch (err) {
          error.value = error;
        } finally {
          setLoading(false);
        }
      }
    }
  );

  // Run on server
  // useTask$(async () => {
  //   try {
  //     const response = await MoviesService.getMovies({
  //       category: category.value,
  //       page: page.value,
  //       query: query.value
  //     });

  //     const res = noSerialize(response);

  //     // console.log('response ', movies.value, response.movies);
  //     movies.value = (res && [...res.movies]) || [];
  //     totalPages.value = (res && res.totalPages) || 1;

  //     isSSR.value = true;
  //   } catch (err) {
  //   } finally {
  //     // setLoading(false);
  //   }
  // });

  useVisibleTask$(async ({ track, cleanup }) => {
    track(() => category.value);

    const controller = new AbortController();

    console.log('category tracked ', category.value);

    await fetchMovies({ controller });

    cleanup(() => controller.abort());
  });

  useVisibleTask$(async ({ track, cleanup }) => {
    track(() => debouncedQuery.value);

    const controller = new AbortController();

    console.log('query ', debouncedQuery.value);

    await fetchMovies({ controller });

    cleanup(() => controller.abort());
  });

  useVisibleTask$(async ({ track, cleanup }) => {
    track(() => page.value);

    const controller = new AbortController();

    console.log('page ', page.value);

    await fetchMovies({ controller });

    cleanup(() => controller.abort());
  });

  useVisibleTask$(() => {
    setTimeout(() => {
      isSSR.value = false;
      // console.log('isSSR ', isSSR.value);
    }, 500);
  });

  const loadMore = $(() => {
    if (page.value < totalPages.value) {
      page.value++;
    }
  });

  useContextProvider(MoviesContext, {
    query: debouncedQuery,
    page,
    movies,
    totalPages,
    isLoading,
    setCategory,
    setQuery,
    loadMore
  });

  return <Slot />;
});
