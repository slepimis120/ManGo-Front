import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.css']
})

export class LeftmenuComponent {

  url : string;

  constructor(private router: Router){
    this.url = this.router.url;
    this.url = this.url.split('/')[1];
    console.log(this.url);
  }
  routeAccount(){
    this.router.navigate([ this.url + '/profile']);
  }
  routeStatistics(){
    this.router.navigate([ this.url +'/statistics']);
  }
  routeReport(){
    this.router.navigate([ this.url + '/report']);
  }

}
