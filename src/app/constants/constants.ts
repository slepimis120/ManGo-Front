import * as L from "leaflet";
import { Passenger } from "../models/passenger.model";

export enum MarkerType {
    StartLocation,
    EndLocation,
    CurrentLocation
  }

export enum Users{
  Driver,
  Passenger,
  UnregisteredUser,
  Admin
}

export enum VehicleType{
  Van,
  Standard,
  Luxury,
}

export enum MarkerStep {
    ConnectMarkers,
    PlaceMarker,
    ReturnCoordinate,
    ReturnRideDetails,
    ReturnMarker,
    ReturnRoute,
    TargetLocation,
    CheckMarkers,
    CheckedMarkers,
    GetMarkers,
    SendMarkers,
    SimulateMovement,
    GetCurrentLocation,
  }

export enum RideStep{
  FinishRidePassenger,
  OnStartArrival,
  OnEndArrival,
}

export const startIcon = L.icon({
iconUrl: '../../assets/images/icons/start-location-icon.png',
iconSize: [25, 40],
});
export const endIcon = L.icon({
iconUrl: '../../assets/images/icons/end-location-icon.png',
iconSize: [25, 40], 
});
export const currentLocationIcon  = L.icon({
iconUrl: '../../assets/images/icons/current_location_icon.png',
iconSize: [35, 35],
});
export const invisibleIcon  = L.icon({
  iconUrl: '../../assets/images/icons/current-location-icon.png',
  iconSize: [0, 0],
  });
