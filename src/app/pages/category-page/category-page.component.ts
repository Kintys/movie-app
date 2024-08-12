import { Component, OnInit } from '@angular/core'
import { FilterPanelComponent } from '../../components/filter-panel/filter-panel.component'
import { MovieCardComponent } from '../../components/movie-card/movie-card.component'
import { AsyncPipe, CommonModule } from '@angular/common'
import { Store } from '@ngrx/store'
import { selectFilteredAndSortMovieListWithParams } from '@/app/store/movie-store/movieSelector'
import { SortBarComponent } from '../../components/sort-bar/sort-bar.component'
import { FilterSearchPipe } from '@/app/pipes/filter-search/filter-search.pipe'
import { Movie } from '@/app/shared/type-declorate'

@Component({
    selector: 'app-category-page',
    standalone: true,
    imports: [FilterPanelComponent, MovieCardComponent, AsyncPipe, SortBarComponent, FilterSearchPipe, CommonModule],
    templateUrl: './category-page.component.html',
    styleUrl: './category-page.component.scss'
})
export class CategoryPageComponent {
    filteredMovieArr?: any[]
    sortMovie$ = this.store.select(selectFilteredAndSortMovieListWithParams)
    searchText: string = ''
    constructor(private store: Store) {}
    trackByMovieId(movie: Movie): number {
        return movie.id
    }
    addSearchText(text: string) {
        this.searchText = text
    }
}
