import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core'
import { provideRouter } from '@angular/router'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { provideStore } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { MovieReducer } from './store/movie-store/movieReducer'
import { MovieEffects } from './store/movie-store/movieEffects'
import { UserReducers } from './store/user-store/userReducers'
import { UserEffect } from './store/user-store/userEffects'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { environment } from '@/environments/environment.development'

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(BrowserAnimationsModule),
        provideHttpClient(),
        provideStore({ movieState: MovieReducer, userState: UserReducers }),
        provideEffects([MovieEffects, UserEffect]),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
        provideFirebaseApp(() => initializeApp(environment.firebaseAPI)),
        provideAuth(() => getAuth())
    ]
}
