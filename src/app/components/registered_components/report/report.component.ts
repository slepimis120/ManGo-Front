import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  startDate:String;
  endDate:String;
  totalRides:String;
  averageRides:String;
  totalKilometres:String;
  averageKilometres:String;
  textDate:String;
  startDateInString!:String;
  endDateInString!:String;
  dataPoints:any = [];
  chart:any;
  dataPoints2:any = [];
  chart2:any;
  
  constructor(private http:HttpClient) {
    this.totalRides = "Total:";
    this.averageRides = "Average:";
    this.totalKilometres = "Total:";
    this.averageKilometres = "Average:";
    this.startDate = formatDate(Date.now() - 7 * 24 * 60 * 60 * 1000, 'yyyy-MM-dd', 'en_US')
    this.endDate = formatDate(Date.now(), 'yyyy-MM-dd', 'en_US')
    this.textDate =  formatDate(Date.now() - 7 * 24 * 60 * 60 * 1000, 'dd/MM/yyyy', 'en_US') + " - " + formatDate(Date.now(), 'dd/MM/yyyy', 'en_US')
  }

 ngOnInit(): void {
 }

 chartOptions = {
  theme: "light2",
  zoomEnabled: true,
  exportEnabled: true,
  title: {
    text:"Total rides"
  },
  axisY: {
    title: "Rides",
  },
  data: [{
    type: "line",
    name: "Rides total",
    xValueType: "dateTime",
    dataPoints: this.dataPoints
  }]
}

chartOptions2 = {
  theme: "light2",
  zoomEnabled: true,
  exportEnabled: true,
  title: {
    text:"Total kilometres"
  },
  axisY: {
    title: "Kilometres",
  },
  data: [{
    type: "line",
    name: "Kilometres total",
    xValueType: "dateTime",
    dataPoints: this.dataPoints2
  }]
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
      this.http.post<string>("http://localhost:8080/api/driver/report/" + decodedJWT.id, {startDate: this.startDateInString, endDate: this.endDateInString}).subscribe((res) => {
        var json = JSON.parse(JSON.stringify(res));
        var count = Math.floor((Date.UTC(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate()) - Date.UTC(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate()) ) /(1000 * 60 * 60 * 24));
        var totalRides = 0;
        var totalKilometres = 0;
        
        for(var i=0; i < json.totalRides.length; i++){
          totalRides = totalRides + json.totalRides[i].count;
        }
        for(var i=0; i < json.totalKilometres.length; i++){
          totalKilometres = totalKilometres + json.totalKilometres[i].count;
        }
        this.totalRides = "Total: " + totalRides;
        this.totalKilometres = "Total: " + totalKilometres;
        this.averageRides = "Average: " + (totalRides/count);
        this.averageKilometres = "Average: " + (totalKilometres/count);
        
        for(var dt=dateStart; dt<=dateEnd; dt.setDate(dt.getDate()+1)){
          for(var i=0; i < json.totalRides.length; i++){
            if(new Date(Number(json.totalRides[i].date.split('-')[0]), Number(json.totalRides[i].date.split('-')[1]) - 1, Number(json.totalRides[i].date.split('-')[2].split('T')[0])).getTime() == dt.getTime()){
              this.dataPoints.push({x: new Date(dt), y: Number(json.totalRides[i].count) });
            }else{
              this.dataPoints.push({x: new Date(dt), y: Number(0) });
            }
          }

          for(var i=0; i < json.totalKilometres.length; i++){
            if(new Date(Number(json.totalKilometres[i].date.split('-')[0]), Number(json.totalKilometres[i].date.split('-')[1]) - 1, Number(json.totalKilometres[i].date.split('-')[2].split('T')[0])).getTime() == dt.getTime()){
              this.dataPoints2.push({x: new Date(dt), y: Number(json.totalKilometres[i].count) });
            }else{
              this.dataPoints2.push({x: new Date(dt), y: Number(0) });
            }
          }
        }
      });
    }
 }
}
