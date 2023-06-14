import { Movie } from './movie.model';

export class Movies {
    movies: Movie[];
    totalPages: number;

    constructor(data: any) {
        this.movies = data.results && data.results.map((item: any) => new Movie(item)) || [];
        this.totalPages = data.total_pages ?? 0;
    }
}