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
    total_pages?: number
    total_results?: number
    category?: string | null
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

export interface TooltipText {
    label: string
    list: string[]
}

export interface Field {
    label?: string
    text?: string
    tooltipText?: TooltipText
}

export interface GeneralComponentModuleText {
    name?: Field
    genre?: Field
    date?: Field
    agreement?: Field
    email?: Field
    password?: Field
    repeatPassword?: Field
}
export interface Genre {
    id: number
    name: string
}
export interface GenreModule {
    genres: Genre[]
}
export interface StatusModule {
    movieSuccess?: string | null
    movieErr?: string | null
    userSuccess?: string | null
    userErr?: string | null
}

interface InvalidTextModule {
    textError: string
    isShowErrorMassage: boolean
}

export interface InvalidTextObject {
    name: InvalidTextModule
    email: InvalidTextModule
    genre: InvalidTextModule
    dateAge: InvalidTextModule
    agreement: InvalidTextModule
}

export type ControlKeys = keyof Omit<InvalidTextObject, 'isInvalid'>
