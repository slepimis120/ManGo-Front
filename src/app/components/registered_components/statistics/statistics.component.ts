import { Component } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  startDate:Date;
  endDate:Date;
  constructor() {
    this.startDate = new Date();
    this.endDate = new Date();
  }

 ngOnInit(): void {
 }
 
 checkDates(): void{
  if(this.startDate != undefined && this.startDate != null && this.endDate != null && this.endDate != undefined)
    if(this.startDate.getDate() >= this.endDate.getDate()){
      alert("Start date can't be bigger than end date!");
    }
 }
}
