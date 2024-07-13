import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'

export const authGuard: CanActivateFn = (route, state) => {
    const token = localStorage.getItem('token')
    if (!token) return inject(Router).navigate(['/auth'])
    else return true
}
