import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-accountinformation',
  templateUrl: './accountinformation.component.html',
  styleUrls: ['./accountinformation.component.css']
})
export class AccountinformationComponent {
  firstLastName:String;
  email:String;
  phone:String;
  address:String;
  oldPassword:String;
  newPassword:String;
  constructor(private http:HttpClient) {

   }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    const accessToken: any = localStorage.getItem('user');
    let decodedJWT = JSON.parse(window.atob(accessToken.split('.')[1]));
    const options: any = {
      responseType: 'text',
    };
    this.http.get<string>("http://localhost:8080/api/passenger/" + decodedJWT.id, options).subscribe((res) => {
      console.log(res);

    });
  }
}
