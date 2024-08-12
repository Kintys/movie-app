import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { CheckboxModule } from 'primeng/checkbox'
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { Store } from '@ngrx/store'
import { selectFilterParams, selectMovieGenre } from '@/app/store/movie-store/movieSelector'
import { AsyncPipe, CommonModule } from '@angular/common'
import { Genre } from '@/app/shared/type-declorate'
import { addFilterValue } from '@/app/store/movie-store/movieActions'
import { ClearObservable } from '@/app/shared/clearObserveble'
import { takeUntil } from 'rxjs'
@Component({
    selector: 'app-filter-panel',
    standalone: true,
    imports: [
        CheckboxModule,
        FormsModule,
        IconFieldModule,
        InputIconModule,
        InputTextModule,
        ButtonModule,
        AsyncPipe,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './filter-panel.component.html',
    styleUrl: './filter-panel.component.scss'
})
export class FilterPanelComponent extends ClearObservable implements OnInit {
    @Output() searchText = new EventEmitter<string>()
    inputText?: string
    inputCheck!: FormControl
    isShowError: boolean = false
    inputErrorText: string = ''
    constructor(private store: Store) {
        super()
    }
    chosenGenreCheckboxArr: Genre[] = []
    selectedMovieGenre$ = this.store.select(selectMovieGenre)
    selectedFilterParams$ = this.store.select(selectFilterParams)
    ngOnInit(): void {
        this.selectedFilterParams$.pipe(takeUntil(this.destroy$)).subscribe((val) => {
            if (val) this.chosenGenreCheckboxArr = val
        })
        this.inputCheck = new FormControl('', [Validators.minLength(3)])
        this.inputCheck.valueChanges.subscribe((val) => this.getSearchText(val))
    }
    onCategoryChange(chosenGenreCheckboxArr: Genre[]): void {
        this.store.dispatch(addFilterValue({ filterValue: chosenGenreCheckboxArr }))
    }
    clearFilter() {
        this.onCategoryChange((this.chosenGenreCheckboxArr = []))
    }
    getSearchText(inputText: string) {
        if (!this.inputCheck.valid) {
            this.inputErrorText = 'You need to enter at least 3 characters.'
            this.isShowError = true
        } else {
            this.searchText.emit(inputText)
            this.inputErrorText = ''
            this.isShowError = false
        }
    }
}
