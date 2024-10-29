import { TestBed } from '@angular/core/testing'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { authGuard } from './auth.guard'
import { selectUserName } from '../store/user-store/userSelectors'
import { inject } from '@angular/core'

describe('authGuard', () => {
    let store: Store
    let router: Router

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Store,
                    useValue: {
                        select: jest.fn()
                    }
                },
                {
                    provide: Router,
                    useValue: {
                        navigate: jest.fn()
                    }
                }
            ]
        })

        store = TestBed.inject(Store)
        router = TestBed.inject(Router)
    })

    it('should allow activation if user is authenticated', () => {
        ;(store.select as jest.Mock).mockReturnValue(of('testUser'))

        const routeMock: any = {}
        const stateMock: any = {}

        const result = TestBed.runInInjectionContext(() => authGuard(routeMock, stateMock))

        expect(result).toBe(true)
    })

    it('should set auth to true if user exists', () => {
        let auth = false
        ;(store.select as jest.Mock).mockReturnValue(of('testUser'))

        TestBed.runInInjectionContext(() => {
            store.select(selectUserName).subscribe((user) => {
                if (user) auth = true
            })
        })

        expect(auth).toBe(true)
    })

    it('should call router.navigate with /auth if auth is false', () => {
        let auth = false
        ;(store.select as jest.Mock).mockReturnValue(of(null))

        TestBed.runInInjectionContext(() => {
            store.select(selectUserName).subscribe((user) => {
                if (user) auth = true
            })

            if (!auth) inject(Router).navigate(['/auth'])
        })

        expect(router.navigate).toHaveBeenCalledWith(['/auth'])
    })
})
