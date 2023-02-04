import { Component } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuItems = [
    {linkId : 1, linkName : 'Home', linkUrl : 'home'},
    {linkId : 2, linkName : 'About', linkUrl : 'about'},
    {linkId : 3, linkName : 'Help', linkUrl : 'help'},
    {linkId : 4, linkName : 'Panic', linkUrl : 'panic'}
  ]

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
}
