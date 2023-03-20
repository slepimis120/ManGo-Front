import { CdkStepper } from '@angular/cdk/stepper';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { timeout } from 'rxjs';
import { MarkerStep, RideStep, Users } from 'src/app/constants/constants';
import { RideRequest } from 'src/app/models/rideRequest.model';
import { Vehicle } from 'src/app/models/vehicle';
import { MarkerService } from 'src/app/services/marker.service';
import { RideService } from 'src/app/services/ride-service.service';


@Component({
  selector: 'app-passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.css']
})
export class PassengerHomeComponent {
  role = Users.Passenger;
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
  invalidTime : boolean = false;
  startLocation! : L.Marker;
  endLocation! : L.Marker;


  @ViewChild('cdkStepperPassenger') cdkStepper: CdkStepper | undefined;
  @ViewChild('ride_time') rideTime!: ElementRef<HTMLInputElement>;

  constructor(private markerService : MarkerService, private rideService : RideService, private router: Router, private http:HttpClient) {
    this.getIncomingData();
    setInterval(() => {
      this.loadingMessageIndex = (this.loadingMessageIndex + 1) % this.loadingMessages.length;
      this.message = this.loadingMessages[this.loadingMessageIndex];
    }, 300);
   }

   ngAfterViewInit(): void {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    let minutesText = "";
    let hoursText = "";
    if(minutes < 10) minutesText = `0${minutes}`;
    else minutesText = `${minutes}`;
    if(hours < 10) hoursText = `0${hours}`;
    else hoursText = `${hours}`;
    const formattedTime = hoursText + ":" + minutesText;
    console.log(formattedTime);
    if (this.rideTime) {
      this.rideTime.nativeElement.value = formattedTime;
    }
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
      if(res["step"] == MarkerStep.SendMarkers){
        this.startLocation = res["start"];
        this.endLocation = res["end"];
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
    })
    this.rideService.getData().subscribe((res) => {
      if(res["step"] == RideStep.OnStartArrival){
        this.router.navigate(['passenger/active']);
      }
    })
    
  }  

  checkTime(){
    const now = new Date();
    const fiveHoursLater = new Date(now.getTime() + 5 * 60 * 60 * 1000);

    const rideTimeValue = this.rideTime.nativeElement.value;
    const rideTimeDate = new Date(`${now.toDateString()} ${rideTimeValue}`);

    if (rideTimeDate.getHours >= now.getHours && rideTimeDate.getMinutes >= now.getMinutes &&
       rideTimeDate.getHours <= fiveHoursLater.getHours && rideTimeDate.getMinutes <= fiveHoursLater.getMinutes) {
      this.cdkStepper?.next()
    } else {
      this.invalidTime = true;
    }

  }

  calculatePrice(selected :any){
    //const httpHeaders = new HttpHeaders().set('Content-Type', 'text');
    //this.http.get<string>("http://localhost:8080/api/unregisteredUser", {headers: httpHeaders}).subscribe((res) => {
    //  console.log(res);
    //});
  }

  //TODO2: find available driver
  findDriver(rideRequest : RideRequest){
    //Connect to server and gather response 
    //GATHER A LIST OF ALL CURRENTLY AVAILABLE DRIVERS
        //temporary variable
    let serverRespone = true;
    let driverList: any[] = [];


    if(serverRespone) {
      this.sendDriverRequest(driverList);
    }
    else {
      this.noDriverAvailible = true;
      this.showLoadingScreen = false;
    }
  }

  //TODO: send a ride request to the driver 
  sendDriverRequest(driverList : any[]){
    console.log("JEBEM TI MAJKU");
    for(const driver of driverList){
      //TODO : send a request to the driver and wait for the response
      //if the driver declines you send a reqest to the other driver 
      let driverResponse = true;
      if(driverResponse){
        this.driverFound = true;
        this.showLoadingScreen = false;
        this.waitForDriver()
        break;
      }
    }
    //No driver will perform the ride so we say no drivers available :(
    setTimeout(() => {
      this.driverFound = true;
      this.showLoadingScreen = false;
      this.markerService.sendData({"step" : MarkerStep.SimulateVehicleMovement});
    }, 3000);
    

  
  }

  // TODO: implement a web socket that will let the passenger know when the driver has STARTED THE RIDE
  waitForDriver(){
    let driverArrived = true;
    //when driver arriver:
    if(driverArrived){
      this.router.navigate(['passenger/active']);
    }
  }


  collectRideInfo(startAddress : string, endAddress: string, selected : string, childrenTag : boolean, petsTag : boolean, scheduledTime : string){
    console.log("koji kurac");
    const accessToken: any = localStorage.getItem('user');
    let decodedJWT = JSON.parse(window.atob(accessToken.split('.')[1]));
    let id = decodedJWT.id;

    this.markerService.sendData({"step" :MarkerStep.GetMarkers});
    while(this.startLocation == undefined){

    }
    let startLocation = this.startLocation.getLatLng();
    let endLocation = this.endLocation.getLatLng();
    let vehicleType = this.rideService.getVehicleType(selected);
    const date = new Date();
    const timeParts = scheduledTime.split(':');
    date.setHours(parseInt(timeParts[0]));
    date.setMinutes(parseInt(timeParts[1]));
    let rideRequest : RideRequest= new RideRequest(id, startLocation, endLocation, startAddress, endAddress, vehicleType, childrenTag, petsTag, date );

    this.findDriver(rideRequest);

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
