import { addSortValue } from '@/app/store/movie-store/movieActions'
import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Store } from '@ngrx/store'
import { SelectButtonModule } from 'primeng/selectbutton'
@Component({
    selector: 'app-sort-bar',
    standalone: true,
    imports: [SelectButtonModule, FormsModule],
    templateUrl: './sort-bar.component.html',
    styleUrl: './sort-bar.component.scss'
})
export class SortBarComponent {
    stateOptions: any[] = [
        { label: 'Popular', value: 'popular' },
        { label: 'Date', value: 'date' },
        { label: 'Rating', value: 'rating' }
    ]
    constructor(private store: Store) {}
    value: string = ''
    onChangeSort() {
        this.store.dispatch(addSortValue({ sortValue: this.value }))
    }
}
