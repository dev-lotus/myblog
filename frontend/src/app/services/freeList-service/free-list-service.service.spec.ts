import { TestBed } from '@angular/core/testing';

import { FreeListServiceService } from './free-list-service.service';

describe('FreeListServiceService', () => {
  let service: FreeListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
