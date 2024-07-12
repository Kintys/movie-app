import { Routes } from '@angular/router'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component'
import { authGuard } from './guards/auth.guard'
export const routes: Routes = [
    {
        path: '',
        // test  для розуміння як працювати redirectTo
        redirectTo: 'welcome',
        pathMatch: 'full'
    },
    {
        path: 'welcome',
        canActivate: [authGuard],
        component: WelcomePageComponent
    },
    {
        path: '',
        component: HomePageComponent,
        // для розуміння як працювати з children
        children: [
            {
                path: 'nowPlaying',
                // динамічна підгрузка компонентів.
                loadComponent: () =>
                    import('./pages/now-playing-page/now-playing-page.component').then((m) => m.NowPlayingPageComponent)
            },
            {
                path: 'popular',
                loadComponent: () =>
                    import('./pages/popular-page/popular-page.component').then((m) => m.PopularPageComponent)
            },
            {
                path: 'topRate',
                loadComponent: () =>
                    import('./pages/top-rate-page/top-rate-page.component').then((m) => m.TopRatePageComponent)
            },
            {
                path: 'upcoming',
                loadComponent: () =>
                    import('./pages/upcoming-page/upcoming-page.component').then((m) => m.UpcomingPageComponent)
            },
            {
                path: 'favourite',
                canActivate: [authGuard],
                loadComponent: () =>
                    import('./pages/favourite-page/favourite-page.component').then((m) => m.FavouritePageComponent)
            },
            {
                path: 'watch',
                canActivate: [authGuard],
                loadComponent: () => import('./pages/watch-page/watch-page.component').then((m) => m.WatchPageComponent)
            }
        ]
    },
    {
        path: 'details/:id',
        canActivate: [authGuard],
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
