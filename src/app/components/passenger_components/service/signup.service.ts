import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignupDTO } from '../model/SignupDTO';
import { SignupResponse } from '../model/SignupResponse';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  url : string = "http://localhost:8080/api/passenger";

  constructor(private http:HttpClient) { }
  
  register(userData : SignupDTO){
    return this.http.post<SignupResponse>(this.url, userData);
  }
}
