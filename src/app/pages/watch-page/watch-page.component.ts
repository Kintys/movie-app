import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Movie } from '@/app/movie-data/type-declorate'
import { FavouriteAndWatchDataService } from '@/app/services/favourite-and-watch-data.service'
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-watch-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './watch-page.component.html',
    styleUrl: './watch-page.component.scss'
})
export class WatchPageComponent implements OnInit {
    watchList!: Movie[]
    token?: string
    sessionId?: string
    accId?: string
    constructor(private watchData: FavouriteAndWatchDataService) {}
    async ngOnInit(): Promise<void> {
        this.sessionId = localStorage.getItem('sessionId')!
        this.accId = localStorage.getItem('accId')!
        this.loadWatchList()
    }
    loadWatchList() {
        this.watchData.getWatchList(this.accId!, this.sessionId!).subscribe((val) => {
            this.watchList = val.results
        })
    }
    deleteItemById(id: string | number) {
        this.watchData.deleteItemFromWatchList(id, this.accId!).subscribe({
            next: () => this.loadWatchList()
        })
    }
}
