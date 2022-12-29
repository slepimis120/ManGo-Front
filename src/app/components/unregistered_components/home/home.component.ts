import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import { MarkerService } from 'src/app/services/marker.service';
import * as L from 'leaflet';
import { MapComponent } from '../../map_components/map/map.component';
import { VehicleType } from 'src/app/models/vehicle.model';
import { thisMonth } from '@igniteui/material-icons-extended';
import * as bootstrap from 'bootstrap';

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
    this.markerService.sendData(startLocation);
    this.markerService.sendData(endLocation);
    
  }

  listenToButtonClicks() {
    this.markerService.getData().subscribe((res) => {
      if(Array.isArray(res)){
        this.price = Math.round(res[0]);
        this.distance = Math.round(res[1] * 10) / 10;
        this.duration = Math.round(res[2]);
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

  callLogin(){
    
  }


}
