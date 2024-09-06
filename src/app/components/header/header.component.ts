import { Component, OnInit } from '@angular/core'
import { Router, RouterLink, RouterOutlet } from '@angular/router'
import { SidebarPanelComponent } from '../sidebar-panel/sidebar-panel.component'
import { ImageModule } from 'primeng/image'
import { AvatarModule } from 'primeng/avatar'
import { ButtonModule } from 'primeng/button'
import { MenuItemModule } from '@/app/shared/type-declorate'
import { TooltipModule } from 'primeng/tooltip'
import { v4 as uuidv4 } from 'uuid'
import { Store } from '@ngrx/store'
import { deleteUserAndAccId, openSubscribePopup } from '@/app/store/user-store/userActions'
import { selectUser } from '@/app/store/user-store/userSelectors'
import { ClearObservable } from '@/app/shared/clearObserveble'
import { takeUntil } from 'rxjs'
@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, RouterOutlet, SidebarPanelComponent, ImageModule, AvatarModule, ButtonModule, TooltipModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent extends ClearObservable implements OnInit {
    links?: MenuItemModule[]
    logoTitle: string = 'FilmFrenzy'
    openSidebar: boolean = false
    selectedUserProfile = this.store.select(selectUser)
    isProfilePhoto: boolean = false
    isGooglePhoto: boolean = false
    userProfile?: string
    constructor(private store: Store, private router: Router) {
        super()
    }
    ngOnInit(): void {
        this.selectedUserProfile.pipe(takeUntil(this.destroy$)).subscribe((val) => {
            if (val.userEmail) {
                if (val.userPhoto) {
                    this.userProfile = val.userPhoto
                    this.isGooglePhoto = true
                } else {
                    this.userProfile = val.userEmail[0]
                }
                this.isProfilePhoto = true
            } else this.isProfilePhoto = false
        })

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
            },
            {
                id: uuidv4(),
                path: 'catalog',
                name: 'movie catalog',
                icon: 'pi pi-video'
            }
        ]
    }
    onSignOut() {
        this.store.dispatch(deleteUserAndAccId())
        this.router.navigate(['/welcome'])
    }
    onSubscribe() {
        this.store.dispatch(openSubscribePopup({ subscribePopup: true }))
    }
}
