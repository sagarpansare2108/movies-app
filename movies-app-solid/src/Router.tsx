import { Route, Router, Routes } from '@solidjs/router';
import { Suspense, lazy } from 'solid-js';

import * as ROUTES from './constants/routes';

// Layout
const Layout = lazy(() => import('./pages/Layout'));

// Pages
const MoviesPage = lazy(() => import('./pages/Movies'));
const MoviePage = lazy(() => import('./pages/Movie'));
import NotFound from './pages/NotFound';

// Components
import Loader from './components/Loader';
import { MoviesProvider } from './contexts/MoviesContext';
import useDocumentTitle from './hooks/useDocumentTitle';
import { MovieProvider } from './contexts/MovieContext';

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
                            <Layout />
                        </MoviesProvider>
                    </Suspense>
                }
            >
                <Route
                    path={'/:category?'}
                    element={
                        <Suspense fallback={<Loader />}>
                            <MoviesPage />
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
            <Route path='*' component={NotFound} />
        </Routes>
    );
}
