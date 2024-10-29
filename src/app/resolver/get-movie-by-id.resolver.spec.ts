import { TestBed } from '@angular/core/testing'
import { provideMockStore, MockStore } from '@ngrx/store/testing'
import { Store } from '@ngrx/store'
import { loadMovieID } from '../store/movie-store/movieActions'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { getMovieById } from './get-movie-by-id.resolver'
import { movieMock } from '../shared/mock-data'
describe('getMovieById', () => {
    let store: MockStore
    const initialState = {}

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideMockStore({ initialState })]
        })

        store = TestBed.inject(Store) as MockStore
    })

    it('should dispatch loadMovieID action with movieId from route params', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')

        const route = {
            paramMap: {
                get: jest.fn().mockReturnValue(movieMock.id)
            }
        } as unknown as ActivatedRouteSnapshot

        TestBed.runInInjectionContext(() => getMovieById(route, {} as RouterStateSnapshot))

        expect(dispatchSpy).toHaveBeenCalledWith(loadMovieID({ movieId: movieMock.id }))
    })

    it('should not dispatch loadMovieID action if movieId is not present', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch')

        const route = {
            paramMap: {
                get: jest.fn().mockReturnValue(null)
            }
        } as unknown as ActivatedRouteSnapshot

        TestBed.runInInjectionContext(() => getMovieById(route, {} as RouterStateSnapshot))

        expect(dispatchSpy).not.toHaveBeenCalled()
    })
})
