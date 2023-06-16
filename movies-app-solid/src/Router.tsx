import { Route, Router, Routes, memoryIntegration } from '@solidjs/router';
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
                        <Layout />
                    </Suspense>
                }
            >
                <Route
                    path={ROUTES.MOVIES}
                    element={
                        <Suspense fallback={<Loader />}>
                            <MoviesProvider>
                                <MoviesPage />
                            </MoviesProvider>
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
