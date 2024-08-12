import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { FavouritePageComponent } from './favourite-page.component'
import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { deleteMovieFromFavouriteList } from '@/app/store/movie-store/movieActions'
import { AsyncPipe } from '@angular/common'
import { movieMock } from '@/app/shared/mock-data'
import { ActivatedRoute } from '@angular/router'

describe('FavouritePageComponent', () => {
    let component: FavouritePageComponent
    let fixture: ComponentFixture<FavouritePageComponent>
    let store: Store

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MovieCardComponent, AsyncPipe, FavouritePageComponent],
            providers: [
                {
                    provide: Store,
                    useValue: {
                        select: jest.fn().mockReturnValue(of([{ ...movieMock }])),
                        dispatch: jest.fn()
                    }
                },
                {
                    provide: ActivatedRoute,
                    useValue: {}
                }
            ]
        }).compileComponents()

        store = TestBed.inject(Store)

        fixture = TestBed.createComponent(FavouritePageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should select favourite list from store', (done) => {
        component.selectedFavouriteList$.subscribe((favouriteList) => {
            expect(favouriteList).toEqual([{ ...movieMock }])
            done()
        })
    })

    it('should dispatch deleteMovieFromFavouriteList when deleteItemById is called', () => {
        const movieId = movieMock.id
        component.deleteItemById(movieId)
        expect(store.dispatch).toHaveBeenCalledWith(deleteMovieFromFavouriteList({ movieId }))
    })
})
