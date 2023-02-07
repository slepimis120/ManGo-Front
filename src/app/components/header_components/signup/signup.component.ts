import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  form = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*\\d)(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{8,15})$")]),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  });

  showModal: boolean = false;
  validCredentials = false;

  constructor(private http:HttpClient){ }

  ngOnInit(): void {
  }

  public createPassenger(){
    this.setUser().subscribe((res) => {
      console.log(res.statusCode);
      if(res.status === 200){
        this.validCredentials = true;
      }
    });
  }

  public setUser(): Observable<any> {
    let url = "http://localhost:8080/api/passenger";
    const options: any = {
      responseType: 'text',
    };
    let firstName = this.form.get('fname')?.value;
    let lastName = this.form.get('lname')?.value;
    let phone = this.form.get('phone')?.value;
    let address = this.form.get('address')?.value;
    let password = this.form.get('password')?.value;
    let email = this.form.get('email')?.value;

    return this.http.post<string>(url, {name: firstName, surname: lastName, profilePicture : "", telephoneNumber : phone, email : email, address : address, password : password }, options);
  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form is valid');
      this.setUser();

    } else {
      console.log('Form is invalid');
      // Show errors and mark form fields as touched
      Object.keys(this.form.controls).forEach((field) => {
        const control = this.form.get(field);
        if(control != undefined){
          control.markAsTouched({ onlySelf: true });
        }
      });
    }
  }
}
