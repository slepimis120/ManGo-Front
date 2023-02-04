import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {
  startDate!:String;
  endDate!:String;
  textDate!:String;
  cancelledRides:String;
  acceptedRides:String;
  workHours:String;
  earnings:String;
  startDateInString!:String;
  endDateInString!:String;
  constructor(private http:HttpClient) {
    this.cancelledRides = "Ride Cancelled:";
    this.acceptedRides = "Ride Accepted:";
    this.workHours = "Work Hours:";
    this.earnings = "Earnings: ";
  }

 ngOnInit(): void {
  this.startDate = formatDate(Date.now() - 7 * 24 * 60 * 60 * 1000, 'yyyy-MM-dd', 'en_US')
  this.endDate = formatDate(Date.now(), 'yyyy-MM-dd', 'en_US')
  this.textDate =  formatDate(Date.now() - 7 * 24 * 60 * 60 * 1000, 'dd/MM/yyyy', 'en_US') + " - " + formatDate(Date.now(), 'dd/MM/yyyy', 'en_US')
 }
 
checkDates(): void{
  var dateStart = new Date(Number(this.startDate.split('-')[0]), Number(this.startDate.split('-')[1]) - 1, Number(this.startDate.split('-')[2])); 
  var dateEnd = new Date(Number(this.endDate.split('-')[0]), Number(this.endDate.split('-')[1]) - 1, Number(this.endDate.split('-')[2]));  
  if(dateStart.getTime() >= dateEnd.getTime()){
      alert("Start date can't be bigger than end date!");
    }else{
      const accessToken: any = localStorage.getItem('user');
      let decodedJWT = JSON.parse(window.atob(accessToken.split('.')[1]));
      const httpHeaders = new HttpHeaders().set('Content-Type', 'text');
      this.textDate = formatDate(dateStart, 'dd/MM/yyyy', 'en_US') + " - " + formatDate(dateEnd, 'dd/MM/yyyy', 'en_US')
      this.startDateInString = formatDate(dateStart, 'yyyy-MM-ddT00:00:00Z', 'en_US');
      this.endDateInString = formatDate(dateEnd, 'yyyy-MM-ddT00:00:00Z', 'en_US');
      this.http.post<string>("http://localhost:8080/api/driver/stats/" + decodedJWT.id, {startDate: this.startDateInString, endDate: this.endDateInString}).subscribe((res) => {
        var json = JSON.parse(JSON.stringify(res));  
        console.log(json['acceptedRides']);
        this.cancelledRides = "Cancelled rides:" + json['cancelledRides'];
        this.earnings = "Earnings:" + json['earnings'];
        this.acceptedRides = "Accepted Rides:" + json['acceptedRides'];
        this.workHours = "Work Hours:" + json['workTime'];

      });
    }
 }
}
