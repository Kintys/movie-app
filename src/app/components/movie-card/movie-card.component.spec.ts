import { ComponentFixture, TestBed } from '@angular/core/testing'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { MovieCardComponent } from './movie-card.component'
import { PrefixUrlPipe } from '@/app/pipes/prefix-url/prefix-url.pipe'
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'
import { RouterLink } from '@angular/router'
import { TooltipModule } from 'primeng/tooltip'
import { addToFavouriteList, addToWatchList } from '@/app/store/movie-store/movieActions'
import { movieMock } from '@/app/shared/mock-data'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'

describe('MovieCardComponent', () => {
    let component: MovieCardComponent
    let fixture: ComponentFixture<MovieCardComponent>
    let store: MockStore

    const initialState = {}

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CardModule, ButtonModule, RouterLink, TooltipModule, MovieCardComponent, PrefixUrlPipe],
            providers: [
                provideMockStore({ initialState }),
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id: movieMock.id })
                    }
                }
            ]
        }).compileComponents()

        store = TestBed.inject(MockStore)
        fixture = TestBed.createComponent(MovieCardComponent)
        component = fixture.componentInstance
        component.dataValue = movieMock
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should initialize cardData with dataValue on ngOnInit', () => {
        component.ngOnInit()
        expect(component.cardData).toEqual(component.dataValue)
    })

    it('should dispatch addToFavouriteList action when addItemToFavouriteList is called', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')
        component.addItemToFavouriteList(movieMock.id)
        expect(dispatchSpy).toHaveBeenCalledWith(addToFavouriteList({ movieId: movieMock.id }))
    })

    it('should dispatch addToWatchList action when addItemToWatchList is called', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')
        component.addItemToWatchList(movieMock.id)
        expect(dispatchSpy).toHaveBeenCalledWith(addToWatchList({ movieId: movieMock.id }))
    })

    it('should emit deleteItem event when deleteItemById is called', () => {
        const deleteItemSpy = jest.spyOn(component.deleteItem, 'emit')
        component.deleteItemById(movieMock.id)
        expect(deleteItemSpy).toHaveBeenCalledWith(movieMock.id)
    })
})
