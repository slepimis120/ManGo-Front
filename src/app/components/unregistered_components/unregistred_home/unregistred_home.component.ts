import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import { MarkerService } from 'src/app/services/marker.service';
import * as bootstrap from 'bootstrap';
import { MarkerStep } from 'src/app/constants/constants';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-home',
  templateUrl: './unregistred_home.component.html',
  styleUrls: ['./unregistred_home.component.css']
})
export class UnregisteredHomeComponent{
  price! : number;
  distance! : number;
  duration! : number;
  modalName: bootstrap.Modal | undefined
  loginModal: any;
  signupModal: any;
  invalidMarkers: boolean = false;

  @ViewChild('cdkStepperUnregistered') cdkStepper: CdkStepper | undefined;

  constructor(private markerService : MarkerService) {
    
   }

   ngAfterViewInit() {
    this.getIncomingData();
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

    save(){
      this.loginModal?.toggle()
  }
    openloginModal(element: string | Element){
      this.loginModal = new bootstrap.Modal(element,{} ) 
      this.loginModal?.show()
    }
    opensignupModal(element: string | Element){
      this.signupModal = new bootstrap.Modal(element,{} ) 
      this.signupModal?.show()
    }
  

  calculate_price(selected :any){
    //const httpHeaders = new HttpHeaders().set('Content-Type', 'text');
    //this.http.get<string>("http://localhost:8080/api/unregisteredUser", {headers: httpHeaders}).subscribe((res) => {
    //  console.log(res);
    //});
    this.price = this.distance * 120;
    if(selected == "standard"){
      this.price += 120;
    }else if(selected == "luxury"){
      this.price += 200;
    }else {
      this.price += 180
    }
  }




}
