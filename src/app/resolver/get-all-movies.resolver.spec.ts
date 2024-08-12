import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Store } from '@ngrx/store'
import { getAllMoviesResolver } from './get-all-movies.resolver'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { of } from 'rxjs'
import { TestBed } from '@angular/core/testing'

describe('getAllMoviesResolver', () => {
    let store: MockStore
    const initialState = {}

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideMockStore({ initialState })]
        })

        TestBed.runInInjectionContext(() => {
            store = TestBed.inject(Store) as MockStore
        })

        store.select = jest.fn().mockReturnValue(
            of({
                nowPlaying: 'now_playing',
                popular: 'popular',
                topRate: 'top_rated',
                upcoming: 'upcoming'
            })
        )
    })
    it('should create', () => {
        TestBed.runInInjectionContext(() => {
            const route = {} as ActivatedRouteSnapshot
            const state = {} as RouterStateSnapshot
            expect(getAllMoviesResolver(route, state)).toBeTruthy()
        })
    })
    // it('should dispatch loadAllMovies action with category object', () => {
    //     TestBed.runInInjectionContext(() => {
    //         store = TestBed.inject(Store) as MockStore
    //         const categoryObj = {
    //             nowPlaying: 'now_playing',
    //             popular: 'popular',
    //             topRate: 'top_rated',
    //             upcoming: 'upcoming'
    //         }
    //         const route = {} as ActivatedRouteSnapshot
    //         const state = {} as RouterStateSnapshot
    //         const result = getAllMoviesResolver(route, state)
    //         expect(store.dispatch).toHaveBeenCalledWith(loadAllMovies({ categoryObj: categoryObj }))
    //         expect(result).toBe(true)
    //     })
    // })
})
