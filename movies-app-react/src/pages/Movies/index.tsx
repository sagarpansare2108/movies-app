import { memo, useCallback, useEffect, useState } from 'react';
import styles from './style.module.scss';
import { useMovies, useMoviesDispatch } from '../../hooks/useMovies';
import SearchInputBar from '../../components/SearchInpurBar';
import MoviesList from '../../components/MoviesList';
import {
  SET_CATEGORY,
  SET_CURRENT_PAGE,
  SET_MOVIES,
  SET_QUERY
} from '../../contexts/MoviesContext';
import { Movie } from '../../models';

export default function MoviesPage({
  category = '/popular'
}: {
  category?: string;
}) {
  const { movies, isLoading, page, totalPages, query, isCategoryLoading } = useMovies();
  const dispatch = useMoviesDispatch();

  useEffect(() => {
    dispatch({ type: SET_CATEGORY, category: category });
  }, [category]);

  const onSearch = useCallback(
    (value: string) => {
      dispatch({ type: SET_QUERY, query: value });
    },
    [dispatch]
  );

  const onLoadMore = useCallback(() => {
    if (page < totalPages) {
      dispatch({ type: SET_CURRENT_PAGE, page: page + 1 });
    }
  }, [dispatch, page, totalPages]);

  return (
    <div className='container'>
      <WelcomeHeader />
      <SearchInputBar value={query} onChange={onSearch} isLoading={isLoading} />
      <div className={styles.list}>
        <MoviesList
          movies={movies}
          isLoading={isLoading}
          isCategoryLoading={isCategoryLoading}
        />
      </div>
      {totalPages > 1 && (
        <div className={styles.load_more}>
          <button
            className='btn btn-neutral'
            disabled={isLoading}
            onClick={onLoadMore}
          >
            {isLoading ? 'Please wait...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}

const WelcomeHeader: React.FC = memo(() => {
  console.log('Render WelcomeHeader...');
  return (
    <div className={styles.welcome_header}>
      <h1>Welcome.</h1>
      <h2>Millions of movies to discover. Explore now.</h2>
    </div>
  );
});
