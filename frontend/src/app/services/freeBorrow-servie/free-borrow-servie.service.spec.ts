import { TestBed } from '@angular/core/testing';

import { FreeBorrowServieService } from './free-borrow-servie.service';

describe('FreeBorrowServieService', () => {
  let service: FreeBorrowServieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeBorrowServieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
