import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFreeListingComponent } from './edit-free-listing.component';

describe('EditFreeListingComponent', () => {
  let component: EditFreeListingComponent;
  let fixture: ComponentFixture<EditFreeListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFreeListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFreeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
