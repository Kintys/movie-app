import { Routes } from '@angular/router'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component'
import { authGuard } from './guards/auth.guard'
import { getMovieLIstWithCat } from './resolver/get-movie-list-with-cat.resolver'
import { getMovieById } from './resolver/get-movie-by-id.resolver'
import { getAllMoviesResolver } from './resolver/get-all-movies.resolver'
import { getFavWatchListResolver } from './resolver/get-fav-watch-list.resolver'
export const routes: Routes = [
    {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        canActivate: [authGuard],
        resolve: [getAllMoviesResolver],
        component: WelcomePageComponent
    },
    {
        path: '',
        component: HomePageComponent,
        children: [
            {
                path: 'nowPlaying',
                canActivate: [authGuard],
                resolve: [getMovieLIstWithCat],
                loadComponent: () =>
                    import('./pages/now-playing-page/now-playing-page.component').then((m) => m.NowPlayingPageComponent)
            },
            {
                path: 'popular',
                canActivate: [authGuard],
                resolve: [getMovieLIstWithCat],
                loadComponent: () =>
                    import('./pages/popular-page/popular-page.component').then((m) => m.PopularPageComponent)
            },
            {
                path: 'topRate',
                canActivate: [authGuard],
                resolve: [getMovieLIstWithCat],
                loadComponent: () =>
                    import('./pages/top-rate-page/top-rate-page.component').then((m) => m.TopRatePageComponent)
            },
            {
                path: 'upcoming',
                canActivate: [authGuard],
                resolve: [getMovieLIstWithCat],
                loadComponent: () =>
                    import('./pages/upcoming-page/upcoming-page.component').then((m) => m.UpcomingPageComponent)
            },
            {
                path: 'favourite',
                canActivate: [authGuard],
                resolve: [getFavWatchListResolver],
                loadComponent: () =>
                    import('./pages/favourite-page/favourite-page.component').then((m) => m.FavouritePageComponent)
            },
            {
                path: 'watch',
                canActivate: [authGuard],
                resolve: [getFavWatchListResolver],
                loadComponent: () => import('./pages/watch-page/watch-page.component').then((m) => m.WatchPageComponent)
            }
        ]
    },
    {
        path: 'details/:id',
        canActivate: [authGuard],
        resolve: {
            allMovie: getAllMoviesResolver,
            movie: getMovieById
        },
        loadComponent: () =>
            import('./pages/details-movie-page/details-movie-page.component').then((m) => m.DetailsMoviePageComponent)
    },
    {
        path: 'auth',
        loadComponent: () =>
            import('./components/authentication/authentication.component').then((m) => m.AuthenticationComponent)
    },
    {
        path: '**',
        loadComponent: () =>
            import('./pages/page-not-found/page-not-found.component').then((m) => m.PageNotFoundComponent)
    }
]
