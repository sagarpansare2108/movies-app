import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import * as ROUTES from './constants/routes';

// Hooks
import useDocumentTitle from './hooks/useDocumentTitle';

// Context Providers
import { MoviesProvider } from './contexts/MoviesContext';
import { MovieProvider } from './contexts/MovieContext';

// Pages
const Home = lazy(() => import('./pages/Home'));
const MoviesPage = lazy(() => import('./pages/Movies'));
const MoviePage = lazy(() => import('./pages/Movie'));
import NotFound from './pages/NotFound';

// Components
import { FallbackRoutingError } from './components/FallbackError';
import Loader from './components/Loader';

export default function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

const AppRoutes: React.FC = () => {
  useDocumentTitle();
  return (
    <Suspense fallback={<Loader />}>
      <ErrorBoundary fallbackRender={FallbackRoutingError}>
        <Routes>
          <Route
            path={ROUTES.HOME}
            element={
              <MoviesProvider>
                <Home />
              </MoviesProvider>
            }
          >
            <Route
              index
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
                  <MovieProvider>
                    <MoviePage />
                  </MovieProvider>
                </Suspense>
              }
            />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Suspense>
  );
};
