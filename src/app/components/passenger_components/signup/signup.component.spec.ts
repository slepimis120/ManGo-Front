import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { SignupResponse } from '../model/SignupResponse';
import { SignupService } from '../service/signup.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupDTO } from '../model/SignupDTO';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  const validData = <SignupDTO>{
    name: 'Aleksandra',
    surname: 'Balazevic',
    profilePicture: 'aleksandra.jpg',
    telephoneNumber: '0600538922',
    email: 'aleksandrab10@hotmail.com',
    address: 'Moja Adresa',
    password: 'MojaSifra10',
  };
  const existingUserData = <SignupDTO>{
    name: 'Marko',
    surname: 'Markovic',
    profilePicture: '',
    telephoneNumber: '0600538922',
    email: 'marko@gmail.com',
    address: 'Moja Adresa',
    password: 'MarkovaSifra10',
  };
  const emptyNameData = <SignupDTO>{
    name: '',
    surname: 'Balazevic',
    profilePicture: 'aleksandra.jpg',
    telephoneNumber: '0600538922',
    email: 'aleksandrab10@hotmail.com',
    address: 'Moja Adresa',
    password: 'MojaSifra10',
  };
  const emptySurnameData = <SignupDTO>{
    name: 'Aleksandra',
    surname: '',
    profilePicture: 'aleksandra.jpg',
    telephoneNumber: '0600538922',
    email: 'aleksandrab10@hotmail.com',
    address: 'Moja Adresa',
    password: 'MojaSifra10',
  };
  const emptyEmailData = <SignupDTO>{
    name: 'Aleksandra',
    surname: 'Balazevic',
    profilePicture: 'aleksandra.jpg',
    telephoneNumber: '0600538922',
    email: '',
    address: 'Moja Adresa',
    password: 'MojaSifra10',
  };
  const emptyAddressData = <SignupDTO>{
    name: 'Aleksandra',
    surname: 'Balazevic',
    profilePicture: 'aleksandra.jpg',
    telephoneNumber: '0600538922',
    email: 'aleksandrab10@hotmail.com',
    address: '',
    password: 'MojaSifra10',
  };
  const emptyPasswordData = <SignupDTO>{
    name: 'Aleksandra',
    surname: 'Balazevic',
    profilePicture: 'aleksandra.jpg',
    telephoneNumber: '0600538922',
    email: 'aleksandrab10@hotmail.com',
    address: 'Moja Adresa',
    password: '',
  };
  
  const invalidEmailData = <SignupDTO>{
    name: 'Aleksandra',
    surname: 'Balazevic',
    profilePicture: 'aleksandra.jpg',
    telephoneNumber: '0600538922',
    email: 'ovo nije mejl',
    address: 'Moja Adresa',
    password: 'MojaSifra10',
  };
  const invalidPasswordData = <SignupDTO>{
    name: 'Aleksandra',
    surname: 'Balazevic',
    profilePicture: 'aleksandra.jpg',
    telephoneNumber: '0600538922',
    email: 'aleksandrab10@hotmail.com',
    address: 'Moja Adresa',
    password: 'imaodredjenobrazac',
  };
  const invalidPhoneData = <SignupDTO>{
    name: 'Aleksandra',
    surname: 'Balazevic',
    profilePicture: 'aleksandra.jpg',
    telephoneNumber: '02aaa',
    email: 'aleksandrab10@hotmail.com',
    address: 'Moja Adresa',
    password: 'MojaSifra10',
  };

  const registeredUser = <SignupResponse>{
    id: 1,
    name: 'Aleksandra',
    surname: 'Balazevic',
    email: 'aleksandrab10@hotmail.com',
    address: 'Moja Adresa',
    profilePicture: 'aleksandra.jpg',
    telephoneNumber: '0600538922',
  };

  const signupServiceSpy = jasmine.createSpyObj<SignupService>([
    'register',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports:[ReactiveFormsModule,],
      providers: [
        { provide: SignupService, useValue: signupServiceSpy },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should register user', () => {
    spyOn(component, 'createPassenger').and.callThrough();
    fixture.detectChanges();
    component.form.setValue({
      fname : validData.name,
      lname : validData.surname,
      email: validData.email,
      password: validData.password,
      phone: validData.telephoneNumber,
      address : validData.address
    });
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('.login_btn');
    submitButton.click();

    expect(component.createPassenger).toHaveBeenCalled();
    expect(component.form.valid).toBe(true);
  });
  it('should not register user with empty name', () => {
    fixture.detectChanges();
    component.form.setValue({
      fname: emptyNameData.name,
      lname: emptyNameData.surname,
      email: emptyNameData.email,
      password: emptyNameData.password,
      phone: emptyNameData.telephoneNumber,
      address: emptyNameData.address,
    });
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('.login_btn');
    submitButton.click();
  
    expect(component.form.valid).toBe(false);
  });
  
  it('should not register user with empty surname', () => {
    fixture.detectChanges();
    component.form.setValue({
      fname: emptySurnameData.name,
      lname: emptySurnameData.surname,
      email: emptySurnameData.email,
      password: emptySurnameData.password,
      phone: emptySurnameData.telephoneNumber,
      address: emptySurnameData.address,
    });
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('.login_btn');
    submitButton.click();
  
    expect(component.form.valid).toBe(false);
  });
  
  it('should not register user with empty email', () => {
    fixture.detectChanges();
    component.form.setValue({
      fname: emptyEmailData.name,
      lname: emptyEmailData.surname,
      email: emptyEmailData.email,
      password: emptyEmailData.password,
      phone: emptyEmailData.telephoneNumber,
      address: emptyEmailData.address,
    });
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('.login_btn');
    submitButton.click();
  
    expect(component.form.valid).toBe(false);
  });
  
  it('should not register user with empty address', () => {
    fixture.detectChanges();
    component.form.setValue({
      fname: emptyAddressData.name,
      lname: emptyAddressData.surname,
      email: emptyAddressData.email,
      password: emptyAddressData.password,
      phone: emptyAddressData.telephoneNumber,
      address: emptyAddressData.address,
    });
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('.login_btn');
    submitButton.click();
  
    expect(component.form.valid).toBe(false);
  });
  
  it('should not register user with empty password', () => {
    fixture.detectChanges();
    component.form.setValue({
      fname: emptyPasswordData.name,
      lname: emptyPasswordData.surname,
      email: emptyPasswordData.email,
      password: emptyPasswordData.password,
      phone: emptyPasswordData.telephoneNumber,
      address: emptyPasswordData.address,
    });
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('.login_btn');
    submitButton.click();  
    expect(component.form.valid).toBe(false);
  });
  it('should not register user with invalid email', () => {
    fixture.detectChanges();
    component.form.setValue({
      fname: invalidEmailData.name,
      lname: invalidEmailData.surname,
      email: invalidEmailData.email,
      password: invalidEmailData.password,
      phone: invalidEmailData.telephoneNumber,
      address: invalidEmailData.address,
    });
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('.login_btn');
    submitButton.click();
  
    expect(component.form.valid).toBe(false);
  });
  
  it('should not register user with invalid password', () => {
    fixture.detectChanges();
    component.form.setValue({
      fname: invalidPasswordData.name,
      lname: invalidPasswordData.surname,
      email: invalidPasswordData.email,
      password: invalidPasswordData.password,
      phone: invalidPasswordData.telephoneNumber,
      address: invalidPasswordData.address,
    });
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('.login_btn');
    submitButton.click();
  
    expect(component.form.valid).toBe(false);
  });
  
  it('should not register user with invalid phone number', () => {
    fixture.detectChanges();
    component.form.setValue({
      fname: invalidPhoneData.name,
      lname: invalidPhoneData.surname,
      email: invalidPhoneData.email,
      password: invalidPhoneData.password,
      phone: invalidPhoneData.telephoneNumber,
      address: invalidPhoneData.address,
    });
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('.login_btn');
    submitButton.click();
  
    expect(component.form.valid).toBe(false);
  });
  
  it('should not register user with existing email', () => {
    signupServiceSpy.register.and.returnValue(of(registeredUser));
    fixture.detectChanges();
    component.form.setValue({
      fname: existingUserData.name,
      lname: existingUserData.surname,
      email: existingUserData.email,
      password: existingUserData.password,
      phone: existingUserData.telephoneNumber,
      address: existingUserData.address,
    });
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector('.login_btn');
    submitButton.click();
  
    expect(component.form.valid).toBe(true);
    expect(signupServiceSpy.register).toHaveBeenCalledWith(existingUserData);
  });
  

});