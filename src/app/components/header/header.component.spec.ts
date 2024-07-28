import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { HeaderComponent } from './header.component'
import { SidebarPanelComponent } from '../sidebar-panel/sidebar-panel.component'
import { ImageModule } from 'primeng/image'
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { TooltipModule } from 'primeng/tooltip'
import { Router } from '@angular/router'
import { deleteUserAndAccId } from '@/app/store/user-store/userActions'
jest.mock('uuid', () => ({
    v4: () => 'mock-uuid'
}))

describe('HeaderComponent', () => {
    let component: HeaderComponent
    let fixture: ComponentFixture<HeaderComponent>
    let store: MockStore
    let router: Router

    const initialState = {}

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                ImageModule,
                AvatarModule,
                ButtonModule,
                TooltipModule,
                SidebarPanelComponent,
                HeaderComponent
            ],
            providers: [provideMockStore({ initialState })]
        }).compileComponents()

        store = TestBed.inject(MockStore)
        router = TestBed.inject(Router)

        fixture = TestBed.createComponent(HeaderComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should initialize links on ngOnInit', () => {
        component.ngOnInit()
        expect(component.links?.length).toBe(2)
        expect(component.links).toEqual([
            {
                id: 'mock-uuid',
                path: 'favourite',
                name: 'favourite list',
                icon: 'pi pi-heart-fill'
            },
            {
                id: 'mock-uuid',
                path: 'watch',
                name: 'watch list',
                icon: 'pi pi-eye'
            }
        ])
    })

    it('should dispatch deleteUserAndAccId and navigate to auth on sign out', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')
        const navigateSpy = jest.spyOn(router, 'navigate')

        component.onSignOut()

        expect(dispatchSpy).toHaveBeenCalledWith(deleteUserAndAccId())
        expect(navigateSpy).toHaveBeenCalledWith(['/auth'])
    })

    it('should have the correct logo title', () => {
        expect(component.logoTitle).toBe('FilmFrenzy')
    })
})
