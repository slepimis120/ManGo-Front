import { Locations } from "./location";
import { VehicleType } from "./vehicle.model";

export class RideRequest{
    passengerId : number;
    startLocation : L.LatLng;
    endLocation : L.LatLng;
    startAddress : string;
    endAddress : string
    vehicleType: VehicleType;
    babyTransport:boolean;
    petTransport:boolean;
    scheduledRide : Date;

    constructor(passengerId : number, startLocation : L.LatLng, endLocation : L.LatLng,
        startAddress : string, endAddress : string, vehicleType : VehicleType,
        babyTransport : boolean, petTransport : boolean, scheduledRide : Date){
        this.passengerId = passengerId;
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        this.startAddress = startAddress;
        this.endAddress = endAddress;
        this.vehicleType = vehicleType;
        this.babyTransport = babyTransport;
        this.petTransport = petTransport;
        this.scheduledRide = scheduledRide;
    }

}