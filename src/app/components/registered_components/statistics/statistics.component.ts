import { Component } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  startDate:String;
  endDate:String;
  textDate:String;
  constructor() {
    
  }

 ngOnInit(): void {
  this.startDate = formatDate(Date.now() - 7 * 24 * 60 * 60 * 1000, 'yyyy-MM-dd', 'en_US')
  this.endDate = formatDate(Date.now(), 'yyyy-MM-dd', 'en_US')
  this.textDate =  formatDate(Date.now() - 7 * 24 * 60 * 60 * 1000, 'dd/MM/yyyy', 'en_US') + " - " + formatDate(Date.now(), 'dd/MM/yyyy', 'en_US')
 }
 
checkDates(): void{
  var startDate = new Date(Number(this.startDate.split('-')[0]), Number(this.startDate.split('-')[1]) - 1, Number(this.startDate.split('-')[2])); 
  var endDate = new Date(Number(this.endDate.split('-')[0]), Number(this.endDate.split('-')[1]) - 1, Number(this.endDate.split('-')[2])); 
  console.log(startDate);
  console.log(endDate);  
  if(startDate.getDate() >= endDate.getDate()){
      alert("Start date can't be bigger than end date!");
    }else{
      
      this.textDate = formatDate(startDate, 'dd/MM/yyyy', 'en_US') + " - " + formatDate(endDate, 'dd/MM/yyyy', 'en_US')
    }
 }
}
