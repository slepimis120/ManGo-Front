import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
<<<<<<< HEAD
<<<<<<< HEAD
export class HomeComponent{
  constructor() {
   }
    
  startLocation!: string;
  endLocation!: string;
  

   getLocations(): void{
      this.startLocation = (<HTMLInputElement>document.getElementById("start-location")).value;
      this.endLocation = (<HTMLInputElement>document.getElementById("end-location")).value;
     
   }

=======
export class HomeComponent {
  constructor() { }

  ngOnInit(): void {
  }
>>>>>>> parent of 4f60d75 (Merge branch '#3.1.3-Implement-form-for-ride-booking' into #3.1.4-Implement-map)

}
