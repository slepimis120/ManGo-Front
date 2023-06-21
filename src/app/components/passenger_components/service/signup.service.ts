import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  url : string = "http://localhost:8080/api/passenger";

  constructor(private http:HttpClient) { }
  
  register(userData : SignupDTO){
    return this.http.post<string>(this.url, userData);
  }
}
