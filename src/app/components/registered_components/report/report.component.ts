import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  startDate:Date;
  endDate:Date;
  constructor() {

  }

 ngOnInit(): void {
 }
}
