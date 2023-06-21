import { TestBed } from '@angular/core/testing';

import { SignupService } from './signup.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignupDTO } from '../model/SignupDTO';
import { SignupResponse } from '../model/SignupResponse';
import { HttpErrorResponse } from '@angular/common/http';
describe('SignupService', () => {
  let service: SignupService;
  let httpController: HttpTestingController;

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
    profilePicture: 'marko.jpg',
    telephoneNumber: '0600538922',
    email: 'marko@gmail.com',
    address: 'Moja Adresa',
    password: 'MarkovaSifra10',
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

  const  url : string = "http://localhost:8080/api/passenger";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignupService],
    });
    service = TestBed.inject(SignupService);
    httpController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should register a valid user', () => {
    service.register(validData).subscribe((res) => {
      expect(res).toEqual(registeredUser);
    });
    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('POST');

    request.flush(registeredUser);
    httpController.verify();
  });
  it('should show error for already existing username', () => {
    let errorMessage = "User with that email already exists!"
    service.register(existingUserData).subscribe({
      next: () => {},
      error: (error: HttpErrorResponse) => {
        expect(error.status).withContext('status').toEqual(400);
        expect(error.error)
          .withContext('message')
          .toEqual(errorMessage);
      },
    });

    const request = httpController.expectOne(url);
    expect(request.request.method).toEqual('POST');

    request.flush(errorMessage, {
      status: 400,
      statusText: 'Bad Request',
    });
  });
});