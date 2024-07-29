import { loadAccountId, loadSessionId } from '@/app/store/user-store/userActions'
import { selectSessionId, selectUserName } from '@/app/store/user-store/userSelectors'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { ButtonModule } from 'primeng/button'
import { Subscription } from 'rxjs'
import { Location } from '@angular/common'

@Component({
    selector: 'app-authentication',
    standalone: true,
    imports: [ButtonModule],
    templateUrl: './authentication.component.html',
    styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent implements OnInit, OnDestroy {
    title: string = 'Please log in.'
    sub$?: Subscription
    selectedUser$ = this.store.select(selectUserName)
    selectedSession$ = this.store.select(selectSessionId)
    constructor(private store: Store, private location: Location) {}

    ngOnInit(): void {
        this.sub$ = this.selectedUser$.subscribe((user) => {
            if (user) this.location.back()
        })
    }
    onAuth() {
        this.store.dispatch(loadSessionId())
        this.selectedSession$.subscribe((id) => {
            if (id) this.store.dispatch(loadAccountId({ sessionId: id }))
        })
    }

    ngOnDestroy(): void {
        if (this.sub$) this.sub$.unsubscribe()
    }
}
