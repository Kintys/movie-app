import { ComponentFixture, TestBed } from '@angular/core/testing'
import { SidebarPanelComponent } from './sidebar-panel.component'
import { SidebarModule } from 'primeng/sidebar'
import { AvatarModule } from 'primeng/avatar'
import { RouterTestingModule } from '@angular/router/testing'

jest.mock('uuid', () => ({
    v4: () => 'mock-uuid'
}))

describe('SidebarPanelComponent', () => {
    let component: SidebarPanelComponent
    let fixture: ComponentFixture<SidebarPanelComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SidebarModule, AvatarModule, RouterTestingModule, SidebarPanelComponent]
        }).compileComponents()

        fixture = TestBed.createComponent(SidebarPanelComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should initialize menuLinkTitle on ngOnInit', () => {
        component.ngOnInit()
        fixture.detectChanges()
        expect(component.menuLinkTitle?.length).toBe(4)
        expect(component.menuLinkTitle).toEqual([
            { id: 'mock-uuid', path: 'nowPlaying', name: 'now playing', icon: 'pi pi-play-circle' },
            { id: 'mock-uuid', path: 'popular', name: 'popular', icon: 'pi pi-chart-line' },
            { id: 'mock-uuid', path: 'topRate', name: 'top rate', icon: 'pi pi-star-fill' },
            { id: 'mock-uuid', path: 'upcoming', name: 'upcoming', icon: 'pi pi-slack' }
        ])
    })

    it('should emit closeBar event with false on onSidebarHide', () => {
        jest.spyOn(component.closeBar, 'emit')
        component.onSidebarHide()
        expect(component.closeBar.emit).toHaveBeenCalledWith(false)
    })

    it('should have the correct initial logoTitle', () => {
        expect(component.logoTitle).toBe('FilmFrenzy')
    })
})
