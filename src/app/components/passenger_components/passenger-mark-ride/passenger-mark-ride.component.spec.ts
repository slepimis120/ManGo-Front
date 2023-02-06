import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerMarkRideComponent } from './passenger-mark-ride.component';

describe('PassengerMarkRideComponent', () => {
  let component: PassengerMarkRideComponent;
  let fixture: ComponentFixture<PassengerMarkRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerMarkRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerMarkRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
