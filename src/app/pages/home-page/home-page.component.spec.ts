import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { HomePageComponent } from './home-page.component'
import { MovieCardComponent } from '@/app/components/movie-card/movie-card.component'
import { By } from '@angular/platform-browser'
import { RouterOutlet } from '@angular/router'

describe('HomePageComponent', () => {
    let component: HomePageComponent
    let fixture: ComponentFixture<HomePageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([]), HomePageComponent, MovieCardComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(HomePageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should contain RouterOutlet', () => {
        const routerOutletElement = fixture.debugElement.query(By.directive(RouterOutlet))
        expect(routerOutletElement).toBeTruthy()
    })
})
