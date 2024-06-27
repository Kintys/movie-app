import { TestBed } from '@angular/core/testing'

import { MovieDataBaseService } from './movie-data-base.service'

describe('MovieDabaBaseService', () => {
    let service: MovieDataBaseService

    beforeEach(() => {
        TestBed.configureTestingModule({})
        service = TestBed.inject(MovieDataBaseService)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})
