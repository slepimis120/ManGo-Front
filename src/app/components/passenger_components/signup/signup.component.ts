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
  errorCode: boolean = false;
  errorMessage: string = "";
  showModal: boolean = false;
  validCredentials = false;

  constructor(private http:HttpClient){ }

  ngOnInit(): void {
  }

  public createPassenger() {
    if (this.form.valid) {
      this.setUser().subscribe((res) => {
        console.log(res);
        this.validCredentials = true;
        this.errorCode = false;
      }, (err) =>{
        this.errorCode = true;
        this.errorMessage = "User with that email already exists!"
      });
    } else {
      console.log('Form is invalid');
      this.errorMessage = "Please fix the following errors:";
      this.showValidationErrors();
    }
  }

  public setUser(): Observable<any> {
    let url = "http://localhost:8080/api/passenger";
    let firstName = this.form.get('fname')?.value;
    let lastName = this.form.get('lname')?.value;
    let phone = this.form.get('phone')?.value;
    let address = this.form.get('address')?.value;
    let password = this.form.get('password')?.value;
    let email = this.form.get('email')?.value;

    return this.http.post<string>(url, {name: firstName, surname: lastName, profilePicture : "", telephoneNumber : phone, email : email, address : address, password : password });
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
      this.errorCode = false;
      this.setUser();

    } else {
      console.log('Form is invalid');
      this.errorCode = true;
      this.errorMessage = this.getErrorMessage();
      this.showValidationErrors();
    }
  }

  private showValidationErrors() {
    this.form.markAllAsTouched();
  }

  private getErrorMessage(): string {
    const fname = this.form.get('fname');
    const lname = this.form.get('lname');
    const email = this.form.get('email');
    const password = this.form.get('password');
    const address = this.form.get('address');
    const phone = this.form.get('phone');

    if (fname?.errors?.['required'] || lname?.errors?.['required'] || email?.errors?.['required'] || password?.errors?.['required'] || address?.errors?.['required'] || phone?.errors?.['required']) {
      return 'Fill all the required fields!';
    }

    if (email?.errors?.['email']) {
      return 'Please enter a valid email address!';
    }

    if (password?.errors?.['pattern']) {
      return 'Password must be 8-15 characters long and contain at least one digit and one uppercase letter!';
    }

    if (phone?.errors?.['pattern']) {
      return 'Please enter a valid phone number!';
    }

    return '';
  }
}
