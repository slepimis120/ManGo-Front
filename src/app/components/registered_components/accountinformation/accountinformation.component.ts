import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-accountinformation',
  templateUrl: './accountinformation.component.html',
  styleUrls: ['./accountinformation.component.css']
})
export class AccountinformationComponent {
  firstLastName!:String;
  email!:String;
  phone!:String;
  address!:String;
  oldPassword!:String;
  newPassword!:String;
  constructor(private http:HttpClient) {
   }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    const accessToken: any = localStorage.getItem('user');
    let decodedJWT = JSON.parse(window.atob(accessToken.split('.')[1]));
    const httpHeaders = new HttpHeaders().set('Content-Type', 'text');
    this.http.get<string>("http://localhost:8080/api/passenger/" + decodedJWT.id, {headers: httpHeaders}).subscribe((res) => {
      console.log(res);

      var json = JSON.parse(JSON.stringify(res));
      this.firstLastName = json['name'] + " " + json['surname'];
      this.phone = json['telephoneNumber'];
      this.email = json['email'];
      this.address = json['address'];
    });
  }

  changeData(): void{
    const accessToken: any = localStorage.getItem('user');
    let decodedJWT = JSON.parse(window.atob(accessToken.split('.')[1]));
    const options: any = {
      responseType: 'text',
    };

    if(this.oldPassword == ""){
      alert("Enter your current password in \"Old Password\" field!");
    }else if(this.oldPassword != null && this.newPassword != undefined && this.oldPassword != undefined && this.newPassword != null){
      console.log(this.newPassword);
      this.http.put<string>("http://localhost:8080/api/passenger/passwordChange/" + decodedJWT.id, {oldPassword: this.oldPassword, newPassword: this.newPassword}, options).subscribe((res) => {
        console.log(res);
        window.location.reload();
      });
    }
    else if(this.firstLastName.trim().split(" ").length < 2 || this.email == "" || this.phone == "" || this.address == ""){
      alert("Input is wrong!");
    }
    else if(this.firstLastName.trim().split(" ").length >= 2 && this.email != undefined && this.email != null && this.phone != null && this.phone != undefined && this.address != null && this.address != undefined){
      this.http.put<string>("http://localhost:8080/api/passenger/" + decodedJWT.id, {name: this.firstLastName.trim().split(" ")[0], surname: this.firstLastName.trim().split(" ")[1], email: this.email, telephoneNumber: this.phone, address: this.address, password: this.oldPassword}, options).subscribe((res) => {
        console.log(res);
        window.location.reload();
      });
    }
  }
}
