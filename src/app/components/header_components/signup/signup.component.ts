import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  firstName:String;
  lastName:String;
  email:String;
  username:String;
  password:String;
  birthdate:Date;
  address:String;
  telephone:String;
  response:String;
  

  constructor(private http:HttpClient){
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.username = "";
    this.password = "";
    this.address = "";
    this.telephone = "";
  }

  ngOnInit(): void {
  }

  public createPassenger(){
    this.setUser().subscribe((res) => {
      /*console.log(res.statusCode);
      if(res.status === 200){
        document.getElementById('response')!.textContent = "Confirm your email address!";
        document.getElementById('response')!.style.visibility = "visible";
        document.getElementById('response')!.style.color = "black";

      }else{
        document.getElementById('response')!.textContent = res;
        document.getElementById('response')!.style.visibility = "visible";
      }*/
    });
  }

  public setUser(): Observable<any> {
    let url = "http://localhost:8080/api/passenger";
    const options: any = {
      responseType: 'text',
    };
    return this.http.post<string>(url, {name: this.firstName, surname: this.lastName, profilePicture : "", telephoneNumber : this.telephone, email : this.email, address : this.address, password : this.password }, options);
  }
}
