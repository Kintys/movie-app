import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { NowPlayingPageComponent } from './now-playing-page.component'
import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { ActivatedRoute } from '@angular/router'
import { AsyncPipe } from '@angular/common'
import { By } from '@angular/platform-browser'
import { movieMock } from '@/app/shared/mock-data'

describe('NowPlayingPageComponent', () => {
    let component: NowPlayingPageComponent
    let fixture: ComponentFixture<NowPlayingPageComponent>
    let store: Store

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AsyncPipe, NowPlayingPageComponent, MovieCardComponent],
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

        fixture = TestBed.createComponent(NowPlayingPageComponent)
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
