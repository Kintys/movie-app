import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { selectUserName } from '../store/user-store/userSelectors'

export const authGuard: CanActivateFn = () => {
    const store = inject(Store)
    let auth = false
    store.select(selectUserName).subscribe((user) => {
        if (user) auth = true
    })
    if (!auth) return inject(Router).navigate(['/auth'])
    else return true
}
