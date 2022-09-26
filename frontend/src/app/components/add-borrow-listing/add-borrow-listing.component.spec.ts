import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBorrowListingComponent } from './add-borrow-listing.component';

describe('AddBorrowListingComponent', () => {
  let component: AddBorrowListingComponent;
  let fixture: ComponentFixture<AddBorrowListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBorrowListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBorrowListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
