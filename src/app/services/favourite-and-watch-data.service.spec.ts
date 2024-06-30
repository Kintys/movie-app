import { TestBed } from '@angular/core/testing';

import { FavouriteAndWatchDataService } from './favourite-and-watch-data.service';

describe('FavouriteAndWatchDataService', () => {
  let service: FavouriteAndWatchDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouriteAndWatchDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
