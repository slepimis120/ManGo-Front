import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{
  constructor() {
   }
    
  startLocation!: string;
  endLocation!: string;
  

   getLocations(): void{
      this.startLocation = (<HTMLInputElement>document.getElementById("start-location")).value;
      this.endLocation = (<HTMLInputElement>document.getElementById("end-location")).value;
     
   }


}
