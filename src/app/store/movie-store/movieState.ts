import { CategoryMovies, Movie } from '@/app/movie-data/type-declorate'

export interface MovieState {
    moviesListWithCat: Movie[] | null
    allMoviesList: Movie[] | null
    favouriteList: Movie[] | null
    watchList: Movie[] | null
    categoryMovies: CategoryMovies
    movieId?: number | string | null
    success?: string
    error?: any
}
export const initialState: MovieState = {
    moviesListWithCat: null,
    allMoviesList: null,
    favouriteList: null,
    watchList: null,
    categoryMovies: {
        nowPlaying: 'now_playing',
        popular: 'popular',
        topRate: 'top_rated',
        upcoming: 'upcoming'
    }
}
