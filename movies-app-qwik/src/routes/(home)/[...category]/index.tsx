import { component$, noSerialize } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import styles from './style.module.scss';
import { PAGES } from '~/constants';
import MoviesService from '~/services/movies_service';
import MoviesList from '~/components/movies_list';
import { useMovies } from '~/hooks/useMovies';

export const useMoviesRouteLoader = routeLoader$(async (request) => {
  const requestCategory = (request.params && request.params.category) || '';
  const category =
    (requestCategory !== '' && `/${requestCategory}`) || '/popular';
  try {
    const response = await MoviesService.getMovies({
      category: category,
      page: 1
    });
    return noSerialize(response);
  } catch (e) {
    // console.log(e);
  }
});

export default component$(() => {
  // const data = useMoviesRouteLoader();
  // const dataValue = data && data.value;
  // const moviesData = (dataValue && dataValue.movies) || [];
  // const totalPages = (dataValue && dataValue.totalPages) || 1;
  const { query, isLoading, movies, totalPages, loadMore } = useMovies();

  return (
    <>
      <div class={styles.list}>
        <MoviesList movies={movies?.value || []} />
      </div>
      {totalPages && totalPages.value > 1 && (
        <div class={styles.load_more}>
          <button class='btn btn-neutral' onClick$={loadMore}>
            {isLoading?.value ? 'Please wait...' : 'Load More'}
          </button>
        </div>
      )}
    </>
  );
});

export const head: DocumentHead = ({ params }) => {
  const category = (params && params.category && `/${params.category}`) || '/';
  const page = PAGES.find((p) => p.path === category);
  return {
    title: page?.title ?? '',
    meta: [
      {
        name: 'description',
        content: 'Millions of movies to discover. Explore now.'
      }
    ]
  };
};
