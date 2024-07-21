export interface MenuItemModule {
    id: string | number
    path?: string
    name?: string
    icon?: string
}
export interface Movie {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}
export interface MoviePage {
    dates?: {
        maximum: string
        minimum: string
    }
    page: number
    results: Movie[]
}
export interface TokenModule {
    success: boolean
    expires_at: string
    request_token: string
}
export interface SessionModule {
    session_id: string
    success: boolean
}
export interface CategoryMovies {
    [key: string]: string
    nowPlaying: string
    popular: string
    topRate: string
    upcoming: string
}
