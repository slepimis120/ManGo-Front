import { Locations } from "./location";

export interface Vehicle{
    id:number;
    vehicleType:string;
    model:string;
    licenseNumber:string;
    currentLocation:Locations;
    passengerSeats:number;
    babyTransport:boolean;
    petTransport:boolean;
}