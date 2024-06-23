import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { SidebarModule } from 'primeng/sidebar'
import { AvatarModule } from 'primeng/avatar'
import { RouterLink } from '@angular/router'
import { v4 as uuidv4 } from 'uuid'
import { menuList } from '../../movie-data/type-declorate'
@Component({
    selector: 'app-sidebar-panel',
    standalone: true,
    imports: [SidebarModule, AvatarModule, RouterLink],
    templateUrl: './sidebar-panel.component.html',
    styleUrl: './sidebar-panel.component.scss'
})
export class SidebarPanelComponent implements OnInit {
    @Input() openBar: boolean = false
    @Output() closeBar = new EventEmitter<boolean>()
    menuLinkTitle?: menuList[]
    logoTitle: string = 'FilmFrenzy'
    ngOnInit(): void {
        this.menuLinkTitle = [
            {
                id: uuidv4(),
                path: 'nowPlaying',
                name: 'now playing',
                icon: 'pi pi-play-circle'
            },
            { id: uuidv4(), path: 'popular', name: 'popular', icon: 'pi pi-chart-line' },
            { id: uuidv4(), path: 'topRate', name: 'top rate', icon: 'pi pi-star-fill' },
            { id: uuidv4(), path: 'upcoming', name: 'upcoming', icon: 'pi pi-slack' }
        ]
    }

    onSidebarHide() {
        this.closeBar.emit(false)
    }
}
