import { TopRatePageComponent } from './top-rate-page.component'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { ActivatedRoute } from '@angular/router'
import { AsyncPipe } from '@angular/common'
import { By } from '@angular/platform-browser'
import { movieMock } from '@/app/shared/mock-data'

describe('NowPlayingPageComponent', () => {
    let component: TopRatePageComponent
    let fixture: ComponentFixture<TopRatePageComponent>
    let store: Store

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AsyncPipe, TopRatePageComponent, MovieCardComponent],
            providers: [
                {
                    provide: Store,
                    useValue: {
                        select: jest.fn().mockReturnValue(of([movieMock]))
                    }
                },
                {
                    provide: ActivatedRoute,
                    useValue: {}
                }
            ]
        }).compileComponents()

        store = TestBed.inject(Store)

        fixture = TestBed.createComponent(TopRatePageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should select movie list from store', (done) => {
        component.selectedMovieList$.subscribe((movieList) => {
            expect(movieList).toEqual([movieMock])
            done()
        })
    })

    it('should contain MovieCardComponent', () => {
        const movieCardElement = fixture.debugElement.query(By.directive(MovieCardComponent))
        expect(movieCardElement).toBeTruthy()
    })
})
