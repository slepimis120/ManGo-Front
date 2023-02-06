import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Users } from 'src/app/constants/constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  url : string
  @Input() role!: Users;
  registeredUser : boolean = false;

  unregisteredMenu = [
    {linkId : 1, linkName : 'Home', linkUrl : 'home'},
    {linkId : 2, linkName : 'About', linkUrl : 'about'},
    {linkId : 3, linkName : 'Help', linkUrl : 'help'},
    {linkId : 4, linkName : 'Panic', linkUrl : 'panic'}
  ]
  passengerMenu = [
    {linkId : 1, linkName : 'Home', linkUrl : 'home'},
    {linkId : 2, linkName : 'Panic', linkUrl : 'panic'},
    {linkId : 3, linkName : 'Profile', linkUrl : 'profile'},
    {linkId : 4, linkName : 'Report', linkUrl : 'report'},
    {linkId : 5, linkName : 'Statistics', linkUrl : 'statistics'}
  ]
  driverMenu = [
    {linkId : 1, linkName : 'Home', linkUrl : 'home'},
    {linkId : 2, linkName : 'Panic', linkUrl : 'panic'},
    {linkId : 3, linkName : 'Profile', linkUrl : 'profile'},
    {linkId : 4, linkName : 'Report', linkUrl : 'report'},
    {linkId : 5, linkName : 'Statistics', linkUrl : 'statistics'}
  ]

  menuItems! : any;

  constructor(private router: Router){
    this.url = this.router.url;
    console.log(this.url.slice(1));

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



  modalName: bootstrap.Modal | undefined
  loginModal: any;
  signupModal: any;
  save(){
      this.loginModal?.toggle()
  }
  openloginModal(element: string | Element){
    this.loginModal = new bootstrap.Modal(element,{} ) 
    this.loginModal?.show()
  }
  opensignupModal(element: string | Element){
    this.signupModal = new bootstrap.Modal(element,{} ) 
    this.signupModal?.show()
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['home']));
  }

}
