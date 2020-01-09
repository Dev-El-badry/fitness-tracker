import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NextTrainingsComponent } from './next-trainings.component';

describe('NextTrainingsComponent', () => {
  let component: NextTrainingsComponent;
  let fixture: ComponentFixture<NextTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NextTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NextTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
