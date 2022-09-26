import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFreeListingComponent } from './add-free-listing.component';

describe('AddFreeListingComponent', () => {
  let component: AddFreeListingComponent;
  let fixture: ComponentFixture<AddFreeListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFreeListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFreeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
