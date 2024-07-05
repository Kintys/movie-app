import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { Component, OnInit } from '@angular/core'
import { Movie } from '@/app/movie-data/type-declorate'
import { FavouriteAndWatchDataService } from '@/app/services/favourite-and-watch-data.service'
@Component({
    selector: 'app-favourite-page',
    standalone: true,
    imports: [MovieCardComponent],
    templateUrl: './favourite-page.component.html',
    styleUrl: './favourite-page.component.scss'
})
export class FavouritePageComponent implements OnInit {
    favouriteList!: Movie[]
    token?: string
    sessionId?: string
    accId?: string
    constructor(private favouriteData: FavouriteAndWatchDataService) {}
    async ngOnInit(): Promise<void> {
        this.sessionId = localStorage.getItem('sessionId')!
        this.accId = localStorage.getItem('accId')!
        this.loadFavouriteList()
    }
    loadFavouriteList() {
        this.favouriteData.getFavouriteList(this.accId!, this.sessionId!).subscribe((val) => {
            this.favouriteList = val.results
        })
    }
    deleteItemById(id: string | number) {
        this.favouriteData.deleteItemFromFavouriteList(id, this.accId!).subscribe({
            next: () => this.loadFavouriteList()
        })
    }
}
