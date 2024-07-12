import { Component, OnInit } from '@angular/core'
import { RouterLink, RouterOutlet } from '@angular/router'
import { SidebarPanelComponent } from '../sidebar-panel/sidebar-panel.component'
import { ImageModule } from 'primeng/image'
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { MenuItemModule } from '@/app/movie-data/type-declorate'
import { TooltipModule } from 'primeng/tooltip'
import { v4 as uuidv4 } from 'uuid'
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, RouterOutlet, SidebarPanelComponent, ImageModule, AvatarModule, ButtonModule, TooltipModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    links?: MenuItemModule[]
    logoTitle: string = 'FilmFrenzy'
    openSidebar: boolean = false
    ngOnInit(): void {
        this.links = [
            {
                id: uuidv4(),
                path: 'favourite',
                name: 'favourite list',
                icon: 'pi pi-heart-fill'
            },
            {
                id: uuidv4(),
                path: 'watch',
                name: 'watch list',
                icon: 'pi pi-eye'
            }
        ]
    }
    onSignOut() {
        localStorage.clear()
    }
}
