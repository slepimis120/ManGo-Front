import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerRideDetailsComponent } from './passenger-ride-details.component';

describe('PassengerRideDetailsComponent', () => {
  let component: PassengerRideDetailsComponent;
  let fixture: ComponentFixture<PassengerRideDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerRideDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerRideDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
