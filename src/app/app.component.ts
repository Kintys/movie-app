import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { HeaderComponent } from './components/header/header.component'
import { ToastModule } from 'primeng/toast'
import { MessageService } from 'primeng/api'
import { Store, select } from '@ngrx/store'
import { selectMovieStatus } from './store/movie-store/movieSelector'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFireModule } from '@angular/fire/compat'
import { LoginPopupComponent } from './components/login-popup/login-popup.component'
import { Observable, combineLatest, map } from 'rxjs'
import { selectUserStatus } from './store/user-store/userSelectors'
import { StatusModule } from './shared/type-declorate'
import { SubscribeBarComponent } from './components/subscribe-bar/subscribe-bar.component'
import { deleteMovieStatus } from './store/movie-store/movieActions'
import { deleteUserStatus } from './store/user-store/userActions'
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        ButtonModule,
        HeaderComponent,
        ToastModule,
        AngularFireModule,
        AngularFireAuthModule,
        LoginPopupComponent,
        SubscribeBarComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [MessageService]
})
export class AppComponent implements OnInit {
    constructor(private messageService: MessageService, private store: Store) {}
    combinedData$?: Observable<StatusModule>
    ngOnInit(): void {
        this.combinedData$ = combineLatest([
            this.store.pipe(select(selectMovieStatus)),
            this.store.pipe(select(selectUserStatus))
        ]).pipe(
            map(([movieStatus, userStatus]) => {
                return {
                    movieSuccess: movieStatus.success,
                    movieErr: movieStatus.error,
                    userSuccess: userStatus.success,
                    userErr: userStatus.error
                }
            })
        )
        this.combinedData$?.subscribe((status) => {
            this.showSuccess(status.movieSuccess)

            this.showSuccess(status.userSuccess)

            this.showError(status.movieErr)

            this.showError(status.userErr)
        })
    }
    showSuccess(msg: string | undefined | null) {
        if (!msg) return

        if (msg) {
            this.messageService.clear()
        }
        this.messageService.add({
            key: 'success',
            severity: 'success',
            summary: 'Success',
            detail: msg
        })
        this.deleteStatus()
    }
    showError(msg: string | undefined | null) {
        if (!msg) return
        if (msg) {
            this.messageService.clear()
        }
        this.messageService.add({
            key: 'error',
            severity: 'error',
            summary: 'Error',
            detail: msg
        })
        this.deleteStatus()
    }
    deleteStatus() {
        setTimeout(() => {
            this.store.dispatch(deleteUserStatus())
            this.store.dispatch(deleteMovieStatus())
        }, 1000)
    }
}
