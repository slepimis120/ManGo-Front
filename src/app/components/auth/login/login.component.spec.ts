import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoginResponse } from '../model/LoginResponse';
import { SignupComponent } from '../../header_components/signup/signup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../login-service/login.service';
import { Router } from '@angular/router';
import { map, of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let validCredentials = {
    email: 'marko@gmail.com',
    password: 'marko@gmail.com'
  }
  let emptyCredentials = {
    email: '',
    password: ''
  }
  let invalidCredentials = {
    email: 'email.com',
    password: 'password'
  }
  let badCredentials = {
    email: 'email@email.com',
    password: 'password'
  }

  const loginServiceSpy = jasmine.createSpyObj<LoginService>(['login']);

  let url = "http://localhost:8080/api/user/login";

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent, SignupComponent ],
      imports:[ReactiveFormsModule, HttpClientTestingModule,],
      providers: [{ provide: LoginService, useValue: loginServiceSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    window.localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should fail when the form is invalid (password and email are empty)', () => {
    component.form.controls['email'].setValue(emptyCredentials.email);
    component.form.controls['password'].setValue(emptyCredentials.password);
    expect(component.form.valid).toBeFalse();
  });
  it('should fail when the form is invalid (email is in the wrong format)', () => {
    component.form.controls['email'].setValue(invalidCredentials.email);
    component.form.controls['password'].setValue(invalidCredentials.password);
    expect(component.form.valid).toBeFalse();
  });
  it('should succeed when the form is valid', () => {
    component.form.controls['email'].setValue(validCredentials.email);
    component.form.controls['password'].setValue(validCredentials.password);
    expect(component.form.valid).toBeTrue();
  });
  it('should fail when the credentials are invalid', () => {
    const errorMessage = 'Wrong username or password!';
    loginServiceSpy.login.withArgs(badCredentials.email, badCredentials.password).and.returnValue(throwError({ status: 400, error: errorMessage }));
    spyOn(component, 'getAccessToken').and.callThrough();

    component.form.setValue({
      email: badCredentials.email,
      password: badCredentials.password
    });

    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('.login_btn');
    submitButton.click();

    fixture.detectChanges();

    expect(component.getAccessToken).toHaveBeenCalled();
    expect(component.errorCode).toBeTrue();
    expect(component.errorMessage).toBe(errorMessage);
  });
  it('should fail when the user is blocked', () => {
    const errorMessage = 'User is blocked';
    loginServiceSpy.login.withArgs(validCredentials.email, validCredentials.password).and.returnValue(throwError({ status: 400, error: errorMessage }));
    spyOn(component, 'getAccessToken').and.callThrough();
  
    component.form.setValue(validCredentials);
  
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('.login_btn');
    submitButton.click();
  
    fixture.detectChanges();
  
    expect(component.getAccessToken).toHaveBeenCalled();
    expect(component.errorCode).toBeTrue();
    expect(component.errorMessage).toBe(errorMessage);
  });

});
