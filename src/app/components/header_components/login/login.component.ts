import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { accesstoken } from 'src/app/models/accesstoken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  accessToken:accesstoken;
  email:String;
  password:String;
  constructor(private http:HttpClient, private authService: AuthService, private router: Router) {
    this.accessToken = new accesstoken();
    this.email = "";
    this.password = "";
   }

  ngOnInit(): void {
  }



  public getAccessToken(){
    
    this.getUser().subscribe((res) => {
      var json = JSON.parse(res);
      this.accessToken.accesstoken = json['accessToken'];
      this.accessToken.refreshtoken = json['refreshToken'];
      localStorage.setItem('user', this.accessToken.accesstoken);
      this.authService.setUser();
      this.router.navigate(['/']);
    });
  }

  public getUser(): Observable<any> {
    let url = "http://localhost:8080/api/user/login";
    const options: any = {
      responseType: 'text',
    };
    return this.http.post<string>(url, {email: this.email, password: this.password}, options);
  }
}


