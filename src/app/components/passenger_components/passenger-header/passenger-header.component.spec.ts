import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerHeaderComponent } from './passenger-header.component';

describe('PassengerHeaderComponent', () => {
  let component: PassengerHeaderComponent;
  let fixture: ComponentFixture<PassengerHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
