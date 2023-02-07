import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import { MarkerService } from 'src/app/services/marker.service';
import * as bootstrap from 'bootstrap';
import { MarkerStep, Users, VehicleType } from 'src/app/constants/constants';
import { CdkStepper } from '@angular/cdk/stepper';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from '../../header_components/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './unregistred_home.component.html',
  styleUrls: ['./unregistred_home.component.css']
})
export class UnregisteredHomeComponent{
  role = Users.UnregisteredUser;
  price! : number;
  distance! : number;
  duration! : number;
  modalName: bootstrap.Modal | undefined
  loginModal: any;
  signupModal: any;
  invalidMarkers: boolean = false;

  @ViewChild('cdkStepperUnregistered') cdkStepper: CdkStepper | undefined;
  @ViewChild(LoginComponent) modal: LoginComponent | undefined;

  constructor(private markerService : MarkerService, private http : HttpClient) {
    
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
    openloginModal(){
      console.log("tuutuut");
      if(this.modal != undefined){
        console.log("tuutuut2");
        this.modal.show();
      }
    }
    opensignupModal(element: string | Element){
      this.signupModal = new bootstrap.Modal(element,{} ) 
      this.signupModal?.show()
    }
  

  calculate_price(selected : string){
    const options: any = {
      responseType: 'text',
    };
    console.log(this.distance, selected.toUpperCase());
    this.http.put<string>("http://localhost:8080/api/unregisteredUser/calculatePrice", {distance: this.distance, vehicleType: selected.toUpperCase()}, options).subscribe((res) => {
      var json = JSON.parse(JSON.stringify(res));
      console.log(json);
      console.log(typeof json);
      let price = json['estimatedCost'];
      console.log(price);
      });
    
  }

}


