import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { MarkerStep, RideStep, Users, VehicleType } from 'src/app/constants/constants';
import { CoordinateModel } from 'src/app/models/coordinate.model';
import { AcceptRideService } from 'src/app/services/accept-ride.service';
import { MarkerService } from 'src/app/services/marker.service';
import { RideService } from 'src/app/services/ride-service.service';
import { DriverRideRequestComponent } from '../driver-ride-request/driver-ride-request.component';
import { Ride } from 'src/app/models/ride.model';
import { Driver } from 'src/app/models/driver.model';
import { Passenger } from 'src/app/models/passenger.model';
import {Location } from "src/app/models/location.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnInit{
  role = Users.Driver;
  acceptSubscription: Subscription | undefined;
  declineSubscription: Subscription | undefined;
  startCoordinate : CoordinateModel | undefined = undefined;
  endCoordinate : CoordinateModel | undefined = undefined;
  statusText : string  =  "START RIDE";
  status : boolean = false; 
  currentRide : Ride;
  currentTime : number;
  currentDistance : number;
  requestModal: any;
  //subscription: Subscription;


  @ViewChild('ride_details', {static: false}) rideDetails: ElementRef | undefined;
  @ViewChild('map_container', {static: false}) mapContainer: ElementRef | undefined;
  @ViewChild('my_button', {static: false}) my_button: ElementRef | undefined;
  @ViewChild(DriverRideRequestComponent) modal: DriverRideRequestComponent | undefined;


  constructor(private handleRideService: AcceptRideService, private http:HttpClient, private markerService: MarkerService, private rideService : RideService) {
    let startLocation = new Location("Mise Dimitrijevica 34 Novi Sad", 0, 0);
    let endLocation = new Location("Jevrejska 8 Novi Sad", 0, 0);
    let driver = new Driver(0, "Aleksandar", "Mitrovic", "Neki url", "0600538922", "aleksa@gmail.com", "Stevana Mokranjca 92", "sifra", false);
    let passenger = new Passenger(0, "Svetlana", "Raznatovic", "neki url", "0613191670", "ceca@gmail.com", "Jevrejska 8", "sifrica", false);
    let scheduledTime = new Date();
    this.currentRide = new Ride(driver, [startLocation, endLocation], [passenger], VehicleType.Standard, true, true, scheduledTime, 190, 12, 1.3);
    this.currentTime = this.currentRide.duration;
    this.currentDistance = this.currentRide.distance;
    this.openRequestModal();
    //const source = interval(100000);
    //this.subscription = source.subscribe(val => this.openRequestModal());

    setInterval(() => {
      if(this.currentTime != 0){
        this.currentTime -= 1;
        if(this.currentDistance != 0){
          this.currentDistance -= this.currentDistance / this.currentTime;
        }
      }
    }, 60000);
   }


  ngOnInit(): void {
    this.acceptSubscription = this.handleRideService.rideAccepted$.subscribe(
      rideAccepted => {
        this.handleAccept()
      });
      this.declineSubscription = this.handleRideService.rideDeclined$.subscribe(
        rideDeclined => {
          this.handleDecline(rideDeclined)
      });
      this.rideService.getData().subscribe((res) => {
        switch(res["step"]){
          case RideStep.OnStartArrival:
            if(this.my_button != undefined){
              this.my_button.nativeElement.classList.add('yellow');
              this.my_button.nativeElement.classList.remove('dark_gray');
            }
            this.status = true;
            break;
          case RideStep.OnEndArrival:
            if(this.my_button != undefined){
              this.my_button.nativeElement.classList.add('yellow');
              this.my_button.nativeElement.classList.remove('dark_gray');
            }
            this.status = true;
            break;
          
        }
      })
  }

  handleAccept(){

    if(this.rideDetails !=undefined){
      this.rideDetails.nativeElement.style.display = 'block';
    }   
    if(this.mapContainer != undefined){
      this.mapContainer.nativeElement.classList.add('col-8');
    }
    this.markerService.sendData({
      "step" : MarkerStep.PlaceMarker,
      "start-address" : this.currentRide.locations[0].address});
    this.markerService.sendData({
      "step" : MarkerStep.PlaceMarker,
      "end-address" : this.currentRide.locations[1].address});

    this.sendResponseToServer(true);
    setTimeout(() => {
      this.simulateMoving()
      }, 2000);
    

  }

  simulateMoving(){
    this.markerService.simulateMovement();
  }

  handleDecline(myReason : string){
    const accessToken: any = localStorage.getItem('user');
    let decodedJWT = JSON.parse(window.atob(accessToken.split('.')[1]));
    const options: any = {
      responseType: 'text',
    };
    this.http.put<string>("http://localhost:8080/api/ride/" + decodedJWT.id + "/cancel", {reason: myReason}, options).subscribe((res) => {
      });
  }  

  sendResponseToServer(accepted : boolean){
    const accessToken: any = localStorage.getItem('user');
    let decodedJWT = JSON.parse(window.atob(accessToken.split('.')[1]));
   if(accepted){
    const options: any = {
      responseType: 'text',
    };
    this.http.put<string>("http://localhost:8080/api/ride/" + decodedJWT + "/accept", options).subscribe((res) => {
      });
   }
  }

  openRequestModal(){

    const accessToken: any = localStorage.getItem('user');
    let decodedJWT = JSON.parse(window.atob(accessToken.split('.')[1]));
    this.http.get<string>("http://localhost:8080/api/ride/" + decodedJWT.id + "/isAssigned", {headers: 
    {'Access-Control-Allow-Origin': '*' }}).subscribe((res) => {
      if(res == "1234"){

      }else{
        if(this.modal != undefined){
          this.modal.show();
        }
      }
          });

  }


  handleClick(){
    if(this.status){
      if(this.statusText == "START RIDE"){
        this.markerService.sendData({"step" : MarkerStep.SimulateMovement, "type" : "to-end"});
        const options: any = {
          responseType: 'text',
        };
        const accessToken: any = localStorage.getItem('user');
        let decodedJWT = JSON.parse(window.atob(accessToken.split('.')[1]));
        this.http.put<string>("http://localhost:8080/api/ride/" + decodedJWT.id + "/start", options).subscribe((res) => {
          });
        this.statusText = "END RIDE";
        if(this.my_button != undefined){
          this.my_button.nativeElement.classList.remove('yellow');
          this.my_button.nativeElement.classList.add('dark_gray');
        }
      }else{
        const options: any = {
          responseType: 'text',
        };
        const accessToken: any = localStorage.getItem('user');
        let decodedJWT = JSON.parse(window.atob(accessToken.split('.')[1]));
        this.http.put<string>("http://localhost:8080/api/ride/" + decodedJWT.id + "/end", options).subscribe((res) => {
          });
        if(this.my_button != undefined){
          this.my_button.nativeElement.classList.remove('yellow');
          this.my_button.nativeElement.classList.add('dark_gray');
        }
        setTimeout(() => {
          if(this.rideDetails !=undefined){
            this.rideDetails.nativeElement.style.display = 'none';
          }   
          if(this.mapContainer != undefined){
            this.mapContainer.nativeElement.classList.remove('col-8');
            this.markerService.sendData({"step" : MarkerStep.ClearMap});
          }
        }, 2000);
      }
    }

  }



  ngAfterViewInit(): void {
    if(this.rideDetails !=undefined){
      this.rideDetails.nativeElement.style.display = 'none';
    }   
    if(this.mapContainer != undefined){
      this.mapContainer.nativeElement.classList.remove('col-8');
    }
    if(this.my_button != undefined){
      this.my_button.nativeElement.classList.add('dark_gray');
    }
  }
}
