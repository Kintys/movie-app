import { Component, OnInit } from '@angular/core'
import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { RouterLink } from '@angular/router'
import { Store } from '@ngrx/store'
import { selectAllMovieList } from '@/app/store/movie-store/movieSelector'
import { AsyncPipe } from '@angular/common'
import { selectUserName } from '@/app/store/user-store/userSelectors'
import { ClearObservable } from '@/app/shared/clearObserveble'

@Component({
    selector: 'app-welcome-page',
    standalone: true,
    imports: [MovieCardComponent, RouterLink, AsyncPipe],
    templateUrl: './welcome-page.component.html',
    styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent extends ClearObservable implements OnInit {
    allMovieList$ = this.store.select(selectAllMovieList)
    userProfile$ = this.store.select(selectUserName)
    isShowBar: boolean = false
    constructor(private store: Store) {
        super()
    }
    ngOnInit(): void {
        this.userProfile$.subscribe((val) => {
            if (val) {
                this.isShowBar = true
            }
        })
    }
}
