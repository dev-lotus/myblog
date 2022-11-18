import { TestBed } from '@angular/core/testing';

import { FreeWantedServiceService } from './free-wanted-service.service';

describe('FreeWantedServiceService', () => {
  let service: FreeWantedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeWantedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
