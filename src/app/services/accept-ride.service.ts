import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcceptRideService {
  private rideAcceptedSource = new Subject<boolean>();
  rideAccepted$ = this.rideAcceptedSource.asObservable();

  private rideDeclinedSource = new Subject<boolean>();
  rideDeclined$ = this.rideDeclinedSource.asObservable();

  constructor() { }

  acceptRide() {
    
    this.rideAcceptedSource.next(true);
  }

  declineRide(reason : string) {
    this.rideDeclinedSource.next(true);
  }
}
