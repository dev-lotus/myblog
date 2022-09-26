import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWantedListingComponent } from './add-wanted-listing.component';

describe('AddWantedListingComponent', () => {
  let component: AddWantedListingComponent;
  let fixture: ComponentFixture<AddWantedListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWantedListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWantedListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
