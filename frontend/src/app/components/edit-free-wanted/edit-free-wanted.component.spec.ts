import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFreeWantedComponent } from './edit-free-wanted.component';

describe('EditFreeWantedComponent', () => {
  let component: EditFreeWantedComponent;
  let fixture: ComponentFixture<EditFreeWantedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFreeWantedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFreeWantedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
