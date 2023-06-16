import styles from './style.module.scss';
import { WelcomeHeader } from '../../components/WelcomeHeader';
import { SearchInput } from '../../components/SearchInput';
import { useMovies } from '../../hooks/useMovies';
import MoviesList from '../../components/MoviesList';
import { createEffect, createMemo, createSignal } from 'solid-js';
import { Movie } from '../../models';

export default function MoviesPage({
  category = '/popular'
}: {
  category?: string;
}) {
  const { setCategory, query, setQuery, movies, totalPages, error, loading } = useMovies();

  console.log('render ', category, movies(), totalPages(), loading());
  
  return (
    <div class='container'>
      <WelcomeHeader />
      <SearchInput
        value={query}
        onChange={setQuery}
        className={styles.movies_search_input}
      />
      <div class={styles.list}>
        <MoviesList movies={movies} isLoading={loading} />
      </div>
    </div>
  );
}
