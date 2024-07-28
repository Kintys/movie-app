import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { WelcomePageComponent } from './welcome-page.component'
import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { RouterTestingModule } from '@angular/router/testing'
import { AsyncPipe } from '@angular/common'
import { By } from '@angular/platform-browser'
import { movieMock } from '@/app/movie-data/mock-data'
import { RouterLink } from '@angular/router'

describe('WelcomePageComponent', () => {
    let component: WelcomePageComponent
    let fixture: ComponentFixture<WelcomePageComponent>
    let store: Store

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, AsyncPipe, WelcomePageComponent, MovieCardComponent, RouterLink],
            providers: [
                {
                    provide: Store,
                    useValue: {
                        select: jest.fn().mockReturnValue(of([movieMock]))
                    }
                }
            ]
        }).compileComponents()

        store = TestBed.inject(Store)

        fixture = TestBed.createComponent(WelcomePageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should select movie list from store', (done) => {
        component.allMovieList$.subscribe((movieList) => {
            expect(movieList).toEqual([movieMock])
            done()
        })
    })

    it('should contain MovieCardComponent', () => {
        const movieCardElement = fixture.debugElement.query(By.directive(MovieCardComponent))
        expect(movieCardElement).toBeTruthy()
    })

    it('should contain RouterLink', () => {
        const routerLinkElement = fixture.debugElement.query(By.directive(RouterLink))
        expect(routerLinkElement).toBeTruthy()
    })
})
