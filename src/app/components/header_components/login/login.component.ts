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
  isLoaded:boolean;
  constructor(private http:HttpClient, private authService: AuthService, private router: Router) {
    this.accessToken = new accesstoken();
    this.email = "";
    this.password = "";
    this.isLoaded = true;
   }

  ngOnInit(): void {
    this.isLoaded = true;
  }



  public getAccessToken(){
    this.isLoaded = false;
    this.getUser().subscribe((res) => {
      var json = JSON.parse(res);
      this.accessToken.accesstoken = json['accessToken'];
      this.accessToken.refreshtoken = json['refreshToken'];
      localStorage.setItem('user', this.accessToken.accesstoken);
      this.authService.setUser();
      const accessToken: any = localStorage.getItem('user');
      let decodedJWT = JSON.parse(window.atob(accessToken.split('.')[1]));
      if(decodedJWT.role == "PASSENGER"){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/passenger']));
      }else if(decodedJWT.role == "DRIVER"){
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/driver']));
      }
      
      
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



