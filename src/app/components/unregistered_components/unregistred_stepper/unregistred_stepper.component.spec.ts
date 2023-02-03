import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredStepperComponent } from './unregistred_stepper.component';

describe('StepperComponent', () => {
  let component: UnregisteredStepperComponent;
  let fixture: ComponentFixture<UnregisteredStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisteredStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisteredStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
