import * as L from "leaflet";

export enum MarkerType {
    StartLocation,
    EndLocation,
    CurrentLocation
  }

export enum MarkerStep {
    ConnectMarkers,
    PlaceMarker,
    ReturnCoordinate,
    ReturnRideDetails,
    ReturnMarker,
    ReturnRoute,
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
iconUrl: '../../assets/images/icons/current-location-icon.png',
iconSize: [25, 40],
});
export const invisibleIcon  = L.icon({
  iconUrl: '../../assets/images/icons/current-location-icon.png',
  iconSize: [0, 0],
  });
