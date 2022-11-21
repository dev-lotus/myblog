import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KarmaPointsComponent } from './karma-points.component';

describe('KarmaPointsComponent', () => {
  let component: KarmaPointsComponent;
  let fixture: ComponentFixture<KarmaPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KarmaPointsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KarmaPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
