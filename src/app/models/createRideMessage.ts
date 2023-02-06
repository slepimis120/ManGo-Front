import { RidePassenger } from "./ridePassenger";
import { RideLocation } from "./rideLocation";


export interface CreateRideMessage {

    passengers: {passenger: RidePassenger}[];

    vehicleType: String;

    babyTransport: Boolean;

    petTransport: Boolean;

    locations: { location: RideLocation }[]  ;

    scheduledTime: Date | null;
}