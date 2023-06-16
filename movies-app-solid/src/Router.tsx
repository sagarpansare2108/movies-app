import { Route, Router, Routes } from '@solidjs/router';
import { Suspense, lazy } from 'solid-js';

import * as ROUTES from './constants/routes';

// Pages
const HomePage = lazy(() => import('./pages/Home'));
const MoviesPage = lazy(() => import('./pages/Movies'));
const MoviePage = lazy(() => import('./pages/Movie'));
import NotFound from './pages/NotFound';

// Components
import Loader from './components/Loader';
import { MoviesProvider } from './contexts/MoviesContext';
import useDocumentTitle from './hooks/useDocumentTitle';

export default function AppRouter() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  useDocumentTitle();
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        element={
          <Suspense fallback={<Loader />}>
            <MoviesProvider>
              <HomePage />
            </MoviesProvider>
          </Suspense>
        }
      >
        <Route
          path={ROUTES.HOME}
          element={
            <Suspense fallback={<Loader />}>
              <MoviesPage />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.NOW_PLAYING}
          element={
            <Suspense fallback={<Loader />}>
              <MoviesPage category={ROUTES.NOW_PLAYING} />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.TOP_RATED}
          element={
            <Suspense fallback={<Loader />}>
              <MoviesPage category={ROUTES.TOP_RATED} />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.UPCOMING}
          element={
            <Suspense fallback={<Loader />}>
              <MoviesPage category={ROUTES.UPCOMING} />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.MOVIE}
          element={
            <Suspense fallback={<Loader />}>
              <MoviePage />
            </Suspense>
          }
        />
      </Route>
      <Route path='*' component={NotFound} />
    </Routes>
  );
}
