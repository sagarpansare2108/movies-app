import { BACKDROP_IMAGE_PATH, MEDIUM_POSTER_IMAGE_PATH, SMALL_POSTER_IMAGE_PATH } from '../constants';
import { convertMinutesToHHMM } from '../utils';

export class Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  genres: Genre[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  small_poster_path: string;
  medium_poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime: string;

  constructor(data?: Partial<Movie>) {
    this.adult = data && data.adult || false;
    this.backdrop_path = data && data.backdrop_path ? `${BACKDROP_IMAGE_PATH}${data.backdrop_path}` : '';
    this.genre_ids = data && data.genre_ids || [];
    this.genres = data && data.genres || [];
    this.id = data && data.id || 0;
    this.original_language = data && data.original_language || "";
    this.original_title = data && data.original_title || "";
    this.overview = data && data.overview || '';
    this.popularity = data && data.popularity || 0;
    this.poster_path = data && data.poster_path ? `${SMALL_POSTER_IMAGE_PATH}${data.poster_path}` : '';
    this.small_poster_path = data && data.poster_path ? `${SMALL_POSTER_IMAGE_PATH}${data.poster_path}` : '';
    this.medium_poster_path = data && data.poster_path ? `${MEDIUM_POSTER_IMAGE_PATH}${data.poster_path}` : '';
    this.release_date = data && data.release_date || '';
    this.title = data && data.title || '';
    this.video = data && data.video || false;
    this.vote_average = data && data.vote_average || 0;
    this.vote_count = data && data.vote_count || 0;
    this.runtime = data && data.runtime && convertMinutesToHHMM(data.runtime as unknown as number) || '00:00';
  }
}

export interface Genre {
  id: number;
  name: string;
}