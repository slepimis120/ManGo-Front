import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuItems = [
    {linkId : 1, linkName : 'Home', linkUrl : 'home'},
    {linkId : 2, linkName : 'About', linkUrl : 'about'},
    {linkId : 3, linkName : 'Login', linkUrl : 'login'},
    {linkId : 4, linkName : 'Register', linkUrl : 'register'}
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
