export interface CreateRideDTO {
  passengers: RidePassengerDTO[];
  vehicleType: string;
  babyTransport: boolean;
  petTransport: boolean;
  locations: RideLocationDTO[];
  scheduledTime?: Date;
}

export interface RideLocationDTO {
  departure: LocationDTO;
  destination: LocationDTO;
}

export interface LocationDTO {
  address: string;
  latitude: number;
  longitude: number;
}

export interface RidePassengerDTO {
  id: number;
  email: string;
}
