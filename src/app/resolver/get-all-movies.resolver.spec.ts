import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Store } from '@ngrx/store'
import { loadAllMovies } from '../store/movie-store/movieActions'
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

        store = TestBed.inject(Store) as MockStore

        store.select = jest.fn().mockReturnValue(
            of({
                nowPlaying: 'now_playing',
                popular: 'popular',
                topRate: 'top_rated',
                upcoming: 'upcoming'
            })
        )
    })

    it('should dispatch loadAllMovies action with category object', () => {
        const categoryObj = {
            nowPlaying: 'now_playing',
            popular: 'popular',
            topRate: 'top_rated',
            upcoming: 'upcoming'
        }

        const route = {} as ActivatedRouteSnapshot
        const state = {} as RouterStateSnapshot

        const result = getAllMoviesResolver(route, state)
        expect(store.dispatch).toHaveBeenCalledWith(loadAllMovies({ categoryObj }))
        expect(result).toBe(true)
    })
})
