import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Users } from 'src/app/constants/constants';
import { LoginComponent } from '../../auth/login/login.component';
import { SignupComponent } from '../../passenger_components/signup/signup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild(LoginComponent) loginModal: LoginComponent | undefined;
  @ViewChild(SignupComponent) signupModal: SignupComponent | undefined;
  url : string
  @Input() role!: Users;
  registeredUser : boolean = false;

  unregisteredMenu = [
    {linkId : 1, linkName : 'Home', linkUrl : ''},
    {linkId : 2, linkName : 'About', linkUrl : 'about'},
    {linkId : 3, linkName : 'Help', linkUrl : 'help'},
    {linkId : 4, linkName : 'Panic', linkUrl : 'panic'}
  ]
  passengerMenu = [
    {linkId : 1, linkName : 'Home', linkUrl : 'passenger'},
    {linkId : 2, linkName : 'Panic', linkUrl : 'passenger/panic'},
    {linkId : 3, linkName : 'Profile', linkUrl : 'passenger/profile'},
    {linkId : 4, linkName : 'Statistics', linkUrl : 'passenger/statistics'},
    {linkId : 5, linkName : 'Ride History', linkUrl : 'passenger/history'},
  ]
  driverMenu = [
    {linkId : 1, linkName : 'Home', linkUrl : 'driver'},
    {linkId : 2, linkName : 'Panic', linkUrl : 'driver/panic'},
    {linkId : 3, linkName : 'Profile', linkUrl : 'driver/profile'},
    {linkId : 4, linkName : 'Report', linkUrl : 'driver/report'},
    {linkId : 5, linkName : 'Statistics', linkUrl : 'driver/statistics'}
  ]

  menuItems! : any;

  constructor(private router: Router){
    this.url = this.router.url;
    this.url = this.url.split('/')[1];
    console.log(this.url);
    switch(this.url){
      case "passenger":
        this.menuItems = this.passengerMenu;
        this.registeredUser = true;
        break;
      case "driver":
        this.menuItems = this.driverMenu;
        this.registeredUser = true;
        break;
      default:
      this.menuItems = this.unregisteredMenu;
      this.registeredUser = false;
    }

  }

  ngOnInit() {
    switch(this.role){
      case Users.UnregisteredUser:
        this.menuItems = this.unregisteredMenu;
        break;
      case Users.Driver:
        this.menuItems = this.driverMenu;
        this.registeredUser = true;
        break;
      case Users.Passenger:
      this.menuItems = this.passengerMenu
      this.registeredUser = true;
    }
    
  }
  openloginModal(){
      if(this.loginModal != undefined){
        this.loginModal.show();
      }
  }
  opensignupModal(){
    if(this.signupModal != undefined){
      this.signupModal.show();
    }
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['home']));
  }

}
