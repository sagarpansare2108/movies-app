import { AxiosRequestConfig } from 'axios';
import { Movie, Movies, Review, Trailer } from '../models';
import { RestAPI, handleErrorResponse } from './RestApi';

interface IMoviesParams {
    category?: string;
    page?: number;
    query?: string;
}

class MoviesService {
    static async getMovies({ category = 'popular', page, query }: IMoviesParams, controller?: AbortController): Promise<Movies> {
        try {
            const params: any = {
                page
            };
            query && (params['query'] = query);
            const config: AxiosRequestConfig = {
                params
            };
            controller && (config['signal'] = controller?.signal);
            const url = query ? '/search/movie' : `/movie${category}`;
            const { data } = await RestAPI.get(url, config);
            return new Movies(data);
        } catch (e) {
            throw handleErrorResponse(e);
        }
    }

    static async getMovieById({ id }: { id: any }, controller?: AbortController): Promise<Movie> {
        try {
            const params: any = {};
            const config: AxiosRequestConfig = {
                params
            };
            controller && (config['signal'] = controller?.signal);
            const { data } = await RestAPI.get(`/movie/${id}`, config);
            return new Movie(data);
        } catch (e) {
            throw handleErrorResponse(e);
        }
    }

    static async getReviewsById({ id }: { id: any }, controller?: AbortController): Promise<Review[]> {
        try {
            const params: any = {
                page: 1,
            };
            const config: AxiosRequestConfig = {
                params
            };
            controller && (config['signal'] = controller?.signal);
            const { data } = await RestAPI.get(`/movie/${id}/reviews`, config);
            return data && data.results && data.results.map((item: any) => new Review(item)) || [];
        } catch (e) {
            throw handleErrorResponse(e);
        }
    }

    static async getTrailersById({ id }: { id: any }, controller?: AbortController): Promise<Trailer[]> {
        try {
            const params: any = {
                page: 1,
            };
            const config: AxiosRequestConfig = {
                params
            };
            controller && (config['signal'] = controller?.signal);
            const { data } = await RestAPI.get(`/movie/${id}/videos`, config);
            return data && data.results && data.results.map((item: any) => new Trailer(item)) || [];
        } catch (e) {
            throw handleErrorResponse(e);
        }
    }
}

export default MoviesService;