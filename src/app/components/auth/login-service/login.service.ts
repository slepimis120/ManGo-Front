import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../model/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url :string = "http://localhost:8080/api/user/login";

  constructor(private http:HttpClient) { }

  login(email:any, password:any){
    return this.http.post<LoginResponse>(this.url, { email: email, password: password })
  }

}
