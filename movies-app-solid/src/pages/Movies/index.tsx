import styles from './style.module.scss';
import { WelcomeHeader } from '../../components/WelcomeHeader';
import { SearchInput } from '../../components/SearchInput';
import { useMovies } from '../../hooks/useMovies';
import MoviesList from '../../components/MoviesList';

export default function MoviesPage() {
  const { query, setQuery, movies, totalPages, loading, error } = useMovies();

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
