import { Location } from "./location.model";
export class RideLocations {
    
    departure: Location;

    destination: Location;

    constructor(departure: Location, destination: Location){
        this.departure = departure;
        this.destination = destination;
    }
}

