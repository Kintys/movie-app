import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PageNotFoundComponent } from './page-not-found.component'
import { ImageModule } from 'primeng/image'
import { ButtonModule } from 'primeng/button'
import { RouterTestingModule } from '@angular/router/testing'

describe('PageNotFoundComponent', () => {
    let component: PageNotFoundComponent
    let fixture: ComponentFixture<PageNotFoundComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, ImageModule, ButtonModule, PageNotFoundComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(PageNotFoundComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should have correct title', () => {
        expect(component.titlePage).toBe('404')
    })

    it('should have correct subtitle', () => {
        expect(component.subtitlePage).toBe('Something went wrong. Sorry, We can’t find the page you’re looking for.')
    })
})
