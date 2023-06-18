import {
    createSignal,
    createContext,
    JSX,
    onCleanup,
    createMemo,
    batch,
    Accessor,
    Setter,
    createEffect,
} from 'solid-js';
import MoviesService from '../services/MoviesService';
import { Movie, Review, Trailer } from '../models';
import { useParams } from '@solidjs/router';

export interface IMovieContextType {
    movie: Accessor<Movie | undefined>;
    reviews: Accessor<Review[]>;
    trailers: Accessor<Trailer[]>;
    isLoading: Accessor<boolean>;
    isReviewsLoading: Accessor<boolean>;
    isTrailersLoading: Accessor<boolean>;
    selectedTab: Accessor<string>;
    setSelectedTab: Setter<string>;
    error?: Accessor<any>;
}

export const MovieContext = createContext<IMovieContextType>({} as IMovieContextType);

export function MovieProvider(props: { children: JSX.Element }) {
    const params = useParams<{ id: string }>();
    const id = createMemo(() => params.id);

    const [movie, setMovie] = createSignal<Movie>();
    const [isLoading, setLoading] = createSignal<boolean>(false);
    const [error, setError] = createSignal<any>(null);

    const [selectedTab, setSelectedTab] = createSignal<string>('');

    const [reviews, setReviews] = createSignal<Review[]>([]);
    const [isReviewsLoading, setReviewsLoading] = createSignal<boolean>(false);
    const [isReviewsLoaded, setReviewsLoaded] = createSignal<boolean>(false);

    const [trailers, setTrailers] = createSignal<Trailer[]>([]);
    const [isTrailersLoading, setTrailersLoading] = createSignal<boolean>(false);
    const [isTrailersLoaded, setTrailersLoaded] = createSignal<boolean>(false);

    const fetchMovie = async ({ controller }: { controller: AbortController }) => {
        if (id()) {
            setLoading(true);
            try {
                const response = await MoviesService.getMovieById({
                    id: id()
                }, controller);
                setMovie(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
    }

    const fetchMovieReviews = async ({ controller }: { controller: AbortController }) => {
        if (id()) {
            setReviewsLoading(true);
            try {
                const response = await MoviesService.getReviewsById({
                    id: id()
                }, controller);
                batch(() => {
                    setReviews(response);
                    setReviewsLoaded(true);
                });
            } catch (error) {
                setError(error);
            } finally {
                setReviewsLoading(false);
            }
        }
    }

    const fetchMovieTrailers = async ({ controller }: { controller: AbortController }) => {
        if (id()) {
            setTrailersLoading(true);
            try {
                const response = await MoviesService.getTrailersById({
                    id: id()
                }, controller);
                batch(() => {
                    setTrailers(response);
                    setTrailersLoaded(true);
                });
            } catch (error) {
                setError(error);
            } finally {
                setTrailersLoading(false);
            }
        }
    }

    createEffect(() => {
        const controller = new AbortController();

        fetchMovie({ controller });

        onCleanup(() => {
            controller.abort();
        });
    });

    createEffect(() => {
        const controller = new AbortController();

        if (selectedTab() === 'reviews' && !isReviewsLoaded()) {
            fetchMovieReviews({ controller });
        } else if (selectedTab() === 'trailers' && !isTrailersLoaded()) {
            fetchMovieTrailers({ controller });
        }

        onCleanup(() => {
            controller.abort();
        });
    });

    const value: IMovieContextType = {
        movie,
        reviews,
        trailers,
        selectedTab,
        setSelectedTab,
        isLoading,
        isReviewsLoading,
        isTrailersLoading,
        error
    };

    return (
        <MovieContext.Provider value={value}>
            {props.children}
        </MovieContext.Provider>
    );
}