import * as L from "leaflet";

export enum MarkerType {
    StartLocation,
    EndLocation,
    CurrentLocation
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
