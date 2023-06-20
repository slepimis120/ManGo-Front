import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { accesstoken } from 'src/app/models/accesstoken';
import { SignupComponent } from '../../passenger_components/signup/signup.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginResponse } from '../model/LoginResponse';
import { LoginService } from '../login-service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild(SignupComponent) signupModal: SignupComponent | undefined;
  showModal: boolean = false;
  errorCode : boolean = false;
  errorMessage : string = "";
  accessToken:accesstoken;
  isLoaded:boolean;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private loginService: LoginService, private authService: AuthService, private router: Router) {
    this.accessToken = new accesstoken();
    this.isLoaded = true;
   }

  ngOnInit(): void {
    this.isLoaded = true;
  }
  
  public getAccessToken(){
    this.isLoaded = false;
    let password = this.form.get('password')?.value;
    let email = this.form.get('email')?.value;
    this.loginService.login(email, password).subscribe((res) =>{
      this.accessToken.accesstoken = res.accessToken;
      this.accessToken.refreshtoken = res.refreshToken;
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
    }, (err) =>{
      if (err.status === 400) {
        this.errorMessage = err.error;
        this.errorCode = true;
      }
    })
    
  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
    this.errorMessage = "";
    this.errorCode = false;
  }

  openRegistration(){
    this.hide();
    if(this.signupModal != undefined){
      this.signupModal.show();
    }
  }

  onSubmit() {   
    if (!this.form.valid) {
      console.log('Form is invalid');
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        if(control != undefined){
          control.markAsTouched({ onlySelf: true });
        }
      });

    } 
  }
}