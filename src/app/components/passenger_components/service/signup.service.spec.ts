import { TestBed } from '@angular/core/testing';

import { SignupService } from './signup.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignupDTO } from '../model/SignupDTO';
import { SignupResponse } from '../model/SignupResponse';
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
  
});
