import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { WatchPageComponent } from './watch-page.component'
import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { deleteMovieFromWatchList } from '@/app/store/movie-store/movieActions'
import { ActivatedRoute } from '@angular/router'
import { AsyncPipe } from '@angular/common'
import { movieMock } from '@/app/movie-data/mock-data'

describe('WatchPageComponent', () => {
    let component: WatchPageComponent
    let fixture: ComponentFixture<WatchPageComponent>
    let store: Store

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AsyncPipe, WatchPageComponent, MovieCardComponent],
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

        fixture = TestBed.createComponent(WatchPageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should select watch list from store', (done) => {
        component.selectedWatchList$.subscribe((watchList) => {
            expect(watchList).toEqual([{ ...movieMock }])
            done()
        })
    })

    it('should dispatch deleteMovieFromWatchList when deleteItemById is called', () => {
        const movieId = movieMock.id
        component.deleteItemById(movieId)
        expect(store.dispatch).toHaveBeenCalledWith(deleteMovieFromWatchList({ movieId }))
    })
})
