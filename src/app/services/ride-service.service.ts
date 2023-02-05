import { Injectable } from '@angular/core';
import { VehicleType } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class RideService {

getVehicleType(type : string) : VehicleType{
    switch (type.toUpperCase().trim()){
      case "STANDARD":
        return VehicleType.Standard;
      case "VAN":
        return VehicleType.Van;
      case "LUXURY":
        return VehicleType.Luxury;
      default:
        return VehicleType.Standard;
    }
  }
}
