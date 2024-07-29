import { TestBed } from '@angular/core/testing'
import { ResolveFn } from '@angular/router'

import { getFavWatchListResolver } from './get-fav-watch-list.resolver'

describe('getFavWathListResolver', () => {
    const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
        TestBed.runInInjectionContext(() => getFavWatchListResolver(...resolverParameters))

    beforeEach(() => {
        TestBed.configureTestingModule({})
    })

    it('should be created', () => {
        expect(executeResolver).toBeTruthy()
    })
})
