import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import { MarkerService } from 'src/app/services/marker.service';
import * as bootstrap from 'bootstrap';
import { MarkerStep } from 'src/app/constants/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  price! : number;
  distance! : number;
  duration! : number;
  modalName: bootstrap.Modal | undefined
  loginModal: any;
  signupModal: any;


  constructor(private markerService : MarkerService) {
    this.listenToButtonClicks();
   }


  getAddresses(startLocation : string, endLocation : string) : void { 
    this.markerService.sendData({
      "step" : MarkerStep.ConnectMarkers,
      "start-address" : startLocation,
      "end-address" : endLocation
      });
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

  listenToButtonClicks() {
    this.markerService.getData().subscribe((res) => {
      if(res["finished-connecting"]){
        this.price = Math.round(res["price"]);
        this.duration = Math.round(res["duration"] * 10) / 10;
        this.distance = Math.round(res["distance"]);
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
