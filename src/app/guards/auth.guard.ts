import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { selectUserName } from '../store/user-store/userSelectors'
import { openLoginPopup } from '../store/user-store/userActions'

export const authGuard: CanActivateFn = () => {
    const store = inject(Store)
    let auth = false
    store.select(selectUserName).subscribe((user) => {
        if (user) auth = true
    })
    if (!auth) {
        store.dispatch(openLoginPopup({ loginPopup: true }))
        return false
    } else return true
}
