import { CdkStepper } from '@angular/cdk/stepper';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { timeout } from 'rxjs';
import { MarkerStep } from 'src/app/constants/constants';
import { Vehicle } from 'src/app/models/vehicle';
import { MarkerService } from 'src/app/services/marker.service';

@Component({
  selector: 'app-passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.css']
})
export class PassengerHomeComponent {
  price! : number;
  distance! : number;
  duration! : number;
  showLoadingScreen = true;
  loadingMessages = [
    "Searching for a driver",
    "Searching for a driver.",
    "Searching for a driver..",
    "Searching for a driver...",
    "Searching for a driver..",
    "Searching for a driver."];
  loadingMessageIndex = 0;
  message! : any;
  driverFound : boolean = false;
  noDriverAvailible : boolean = false;
  invalidMarkers : boolean = false;

  @ViewChild('cdkStepperPassenger') cdkStepper: CdkStepper | undefined;

  constructor(private markerService : MarkerService, private router: Router, private http:HttpClient) {
    this.getIncomingData();
    setInterval(() => {
      this.loadingMessageIndex = (this.loadingMessageIndex + 1) % this.loadingMessages.length;
      this.message = this.loadingMessages[this.loadingMessageIndex];
    }, 300);
   }


 
  createRoute() : void { 
    this.markerService.sendData({"step" : MarkerStep.CheckMarkers});
  }

  placeStart(startLocation : string) : void{
    this.markerService.sendData({
      "step" : MarkerStep.PlaceMarker,
      "start-address" : startLocation
      });
  }

  placeEnd(endLocation : string) : void{
    this.markerService.sendData({
      "step" : MarkerStep.PlaceMarker,
      "end-address" : endLocation
      });
  }

  placeTargetStart() : void{
    this.markerService.sendData({
      "step" : MarkerStep.TargetLocation,
      "point" : "start",
    })
  }
  placeTargetEnd() : void{
    this.markerService.sendData({
      "step" : MarkerStep.TargetLocation,
      "point" : "end",
    })
  }

  getIncomingData() {
    this.markerService.getData().subscribe((res) => {
      if(res["step"] == MarkerStep.ReturnRideDetails){
        this.price = Math.round(res["price"]);
        this.duration = Math.round(res["duration"] * 10) / 10;
        this.distance = Math.round(res["distance"]);
      }
      if(res["step"] == MarkerStep.CheckedMarkers){
        if(res["placed"]){
          if(this.cdkStepper != undefined){
            this.cdkStepper.next();
          }
          this.markerService.sendData({
            "step" : MarkerStep.ConnectMarkers,
            });
        }else{
          this.invalidMarkers = true;
          setTimeout(() => {
            this.invalidMarkers = false;
          }, 3000);
        }
      }
    })}  

  //TODO: connect to the backend, this is a mock function
  calculatePrice(selected :any){
    this.price = this.distance * 120;
    if(selected == "standard"){
      this.price += 120;
    }else if(selected == "luxury"){
      this.price += 200;
    }else {
      this.price += 180
    }
  }

  createRideRequest(){
    this.findDriver()
  }

  //TODO: find available driver
  findDriver(){
    this.collectRideInfo();
    //Connect to server and gather response
    let serverRespone = true;

    if(serverRespone) {
      this.sendDriverRequest;
    }
    else {
      this.noDriverAvailible = true;
      this.showLoadingScreen = false;
    }
  }

  //TODO: send a ride request to the driver 
  sendDriverRequest(){
    let driverResponse = true;
    if(driverResponse){
      this.showLoadingScreen = false;
      //Start the ride when the driver starts the ride
      this.router.navigate(['passenger/1/active']);
    }else{
      this.noDriverAvailible = true;
      this.showLoadingScreen = false;
    }
  }

  collectRideInfo(){

  }

  resetForm(){
    if(this.cdkStepper){
      this.cdkStepper.reset()
      this.driverFound = false;
      this.noDriverAvailible = false;
      this.showLoadingScreen = true;
    }
  }
}
