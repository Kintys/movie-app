import { TestBed, fakeAsync, tick } from '@angular/core/testing'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Store } from '@ngrx/store'
import { getMovieLIstWithCat } from './get-movie-list-with-cat.resolver'
import { of } from 'rxjs'

describe('getMovieLIstWithCat', () => {
    let store: Store

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Store,
                    useValue: {
                        dispatch: jest.fn(),
                        select: jest.fn()
                    }
                }
            ]
        })

        store = TestBed.inject(Store)
    })

    // it('should dispatch loadMoviesListWithCat action with category from route URL', fakeAsync(() => {
    //     const dispatchSpy = jest.spyOn(store, 'dispatch')
    //     const route = {
    //         url: [{ path: 'nowPlaying' }]
    //     } as unknown as ActivatedRouteSnapshot
    //     const state = {} as RouterStateSnapshot

    //     jest.spyOn(store, 'select').mockReturnValue(of({ nowPlaying: 'now_playing' }))

    //     TestBed.runInInjectionContext(() => getMovieLIstWithCat(route, state))

    //     tick() // Симулюємо проходження асинхронного коду

    //     expect(dispatchSpy).toHaveBeenCalledWith(loadMoviesListWithCat({ category: 'now_playing' }))
    // }))

    it('should not dispatch loadMoviesListWithCat action if category is not present', fakeAsync(() => {
        const categoryObj = {
            nowPlaying: 'now_playing',
            popular: 'popular',
            topRate: 'top_rated',
            upcoming: 'upcoming'
        }

        jest.spyOn(store, 'select').mockReturnValue(of(categoryObj))
        const dispatchSpy = jest.spyOn(store, 'dispatch')

        const route = {
            url: [{ path: 'non-existent-category' }]
        } as unknown as ActivatedRouteSnapshot
        const state = {} as RouterStateSnapshot

        TestBed.runInInjectionContext(() => getMovieLIstWithCat(route, state))

        tick()

        expect(dispatchSpy).not.toHaveBeenCalled()
    }))
})
