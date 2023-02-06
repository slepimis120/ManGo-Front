import { Location } from "./location.model";

export interface Vehicle{
    id:number;
    vehicleType:string;
    model:string;
    licenseNumber:string;
    currentLocation:Location;
    passengerSeats:number;
    babyTransport:boolean;
    petTransport:boolean;
}