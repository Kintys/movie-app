import { TestBed } from '@angular/core/testing'
import { ResolveFn } from '@angular/router'

import { getMovieLIstWithCat } from './get-movie-list-with-cat.resolver'

describe('aPIrequestResolver', () => {
    const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
        TestBed.runInInjectionContext(() => getMovieLIstWithCat(...resolverParameters))

    beforeEach(() => {
        TestBed.configureTestingModule({})
    })

    it('should be created', () => {
        expect(executeResolver).toBeTruthy()
    })
})
