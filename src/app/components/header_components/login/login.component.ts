import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { accesstoken } from '../../map_components/model/accesstoken';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  accessToken:accesstoken;
  email:String;
  password:String;
  constructor(private http:HttpClient) {
    this.accessToken = new accesstoken();
    this.email = "";
    this.password = "";
   }

  ngOnInit(): void {
  }



  public getAccessToken(){
    let url = "http://localhost:8080/api/user/login";
    observableAccess:new Observable<accesstoken>();
    observableAccess = this.http.post<accesstoken>(url, {'email': this.email, 'password': this.password});
    this.http.post<accesstoken>(url, {'email': this.email, 'password': this.password}).subscribe(data => {
        this.accessToken.accesstoken = data.accesstoken;
        this.accessToken.refreshtoken = data.refreshtoken;
        console.log(this.accessToken.accesstoken);
    }
    );
  }

  public getUser(): Observable<accesstoken> {
    let url = "http://localhost:8080/api/user/login";
    return this.http.get<accesstoken>(url, {'email': this.email, 'password': this.password});
}
}


