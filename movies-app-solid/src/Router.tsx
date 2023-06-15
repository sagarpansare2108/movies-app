import { Route, Router, Routes } from "@solidjs/router";
import { Suspense, lazy } from "solid-js";

import * as ROUTES from './constants/routes';

// Pages
const HomePage = lazy(() => import('./pages/Home'));
const MoviesPage = lazy(() => import('./pages/Movies'));
const MoviePage = lazy(() => import('./pages/Movie'));
import NotFound from "./pages/NotFound";

// Components
import Loader from "./components/Loader";
import { MoviesProvider } from "./contexts/MoviesContext";

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Suspense fallback={<Loader />}>
                    <Route path={ROUTES.HOME} element={
                        <MoviesProvider>
                            <HomePage />
                        </MoviesProvider>
                    }>
                        <Route path={ROUTES.HOME} element={<MoviesPage />} />
                        <Route path={ROUTES.NOW_PLAYING} element={<MoviesPage />} />
                        <Route path={ROUTES.TOP_RATED} element={<MoviesPage />} />
                        <Route path={ROUTES.UPCOMING} element={<MoviesPage />} />
                        <Route path={ROUTES.MOVIE} element={<MoviePage />} />
                    </Route>
                </Suspense>
                <Route path='*' component={NotFound} />
            </Routes>
        </Router>
    );
}