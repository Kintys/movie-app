import { TestBed } from '@angular/core/testing'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Store } from '@ngrx/store'
import { loadFavouriteList, loadWatchList } from '../store/movie-store/movieActions'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { getFavWatchListResolver } from './get-fav-watch-list.resolver'

describe('getFavWatchListResolver', () => {
    let store: MockStore
    const initialState = {}

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideMockStore({ initialState })]
        })

        store = TestBed.inject(Store) as MockStore
    })

    it('should dispatch loadFavouriteList and loadWatchList actions', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')

        const route = {} as ActivatedRouteSnapshot
        const state = {} as RouterStateSnapshot

        TestBed.runInInjectionContext(() => getFavWatchListResolver(route, state))

        expect(dispatchSpy).toHaveBeenCalledWith(loadFavouriteList())
        expect(dispatchSpy).toHaveBeenCalledWith(loadWatchList())
    })
})
