import styles from './style.module.scss';
import { WelcomeHeader } from '../../components/WelcomeHeader';
import { SearchInput } from '../../components/SearchInput';
import { useMovies } from '../../hooks/useMovies';
import MoviesList from '../../components/MoviesList';
import { useIsRouting } from '@solidjs/router';
import { Movies } from '../../models';
import { Show } from 'solid-js';

export default function MoviesPage() {
  const { query, movies, page, totalPages, isLoading, setQuery, loadMore } = useMovies();
  const isRouting = useIsRouting();

  const onLoadMore = () => {
    loadMore();
  };

  return (
    <div class='container'>
      <WelcomeHeader />
      <SearchInput
        value={query}
        onChange={setQuery}
        className={styles.movies_search_input}
      />
      <div class={styles.list}>
        <MoviesList 
          movies={movies} 
          isLoading={isLoading} 
          isRouting={isRouting} 
          isLoadMoreLoading={() => page() > 1}
          />
      </div>
      <Show when={totalPages() > 1}>
        <div class={styles.load_more}>
          <button
            class='btn btn-neutral'
            disabled={isLoading()}
            onClick={onLoadMore}
          >
            {isLoading() ? 'Please wait...' : 'Load More'}
          </button>
        </div>
      </Show>
    </div>
  );
}
