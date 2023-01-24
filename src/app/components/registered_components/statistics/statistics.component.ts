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

  }

 ngOnInit(): void {
 }
}
