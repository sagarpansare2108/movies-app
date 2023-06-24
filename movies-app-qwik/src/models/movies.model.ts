import { noSerialize } from '@builder.io/qwik';
import { Movie } from './movie.model';

export class Movies {
    movies: Movie[];
    totalPages: number;

    constructor(data: any) {
        this.movies = data.results && data.results.map((item: any) => noSerialize(new Movie(item))) || [];
        this.totalPages = data.total_pages ?? 0;
    }
}