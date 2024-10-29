import { ComponentFixture, TestBed } from '@angular/core/testing'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { DetailsMoviePageComponent } from './details-movie-page.component'
import { ButtonModule } from 'primeng/button'
import { ImageModule } from 'primeng/image'
import { RatingModule } from 'primeng/rating'
import { PrefixUrlPipe } from '@/app/pipes/prefix-url/prefix-url.pipe'
import { PanelModule } from 'primeng/panel'
import { FormsModule } from '@angular/forms'
import { AsyncPipe } from '@angular/common'
import { movieMock } from '@/app/shared/mock-data'

describe('DetailsMoviePageComponent', () => {
    let component: DetailsMoviePageComponent
    let fixture: ComponentFixture<DetailsMoviePageComponent>
    let store: Store

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ButtonModule,
                ImageModule,
                RatingModule,
                PanelModule,
                FormsModule,
                AsyncPipe,
                DetailsMoviePageComponent,
                PrefixUrlPipe
            ],
            providers: [
                {
                    provide: Store,
                    useValue: {
                        select: jest.fn().mockReturnValue(of(movieMock))
                    }
                }
            ]
        }).compileComponents()

        store = TestBed.inject(Store)

        fixture = TestBed.createComponent(DetailsMoviePageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should select movie by ID from store', (done) => {
        component.selectedMovieById$.subscribe((movie) => {
            expect(movie).toEqual(movieMock)
            done()
        })
    })
})
