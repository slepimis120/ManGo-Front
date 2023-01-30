import { TestBed } from '@angular/core/testing';

import { AcceptRideService } from './accept-ride.service';

describe('AcceptRideService', () => {
  let service: AcceptRideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcceptRideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
