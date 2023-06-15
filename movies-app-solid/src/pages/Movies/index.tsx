import styles from './style.module.scss';
import { WelcomeHeader } from '../../components/WelcomeHeader';
import { SearchInput } from '../../components/SearchInput';
import { useMovies } from '../../hooks/useMovies';

export default function MoviesPage() {
  const { query, setQuery} = useMovies();

  return (
    <div class='container'>
      <WelcomeHeader />
      <SearchInput
        value={query}
        onChange={setQuery}
        className={styles.movies_search_input} />
    </div>
  );
}
