import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFreeBorrowComponent } from './edit-free-borrow.component';

describe('EditFreeBorrowComponent', () => {
  let component: EditFreeBorrowComponent;
  let fixture: ComponentFixture<EditFreeBorrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFreeBorrowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFreeBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
