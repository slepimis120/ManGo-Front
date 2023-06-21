import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { LoginService } from './login.service';
import { LoginResponse } from '../model/LoginResponse';

describe('LoginService', () => {
  let service: LoginService;
  let httpController: HttpTestingController;

  let validPassengerCredentials = {
    email: 'marko@gmail.com',
    password: 'marko@gmail.com'
  }
  let validDriverCredentials = {
    email: 'momir@gmail.com',
    password: 'momir@gmail.com'
  }
  let invalidCredentials = {
    email: 'email@email.com',
    password: 'password'
  }
  let blockedCredentials =  {
    accessToken: 'saki@saki.com',
    refreshToken: 'saki@saki.com'
  }
  let notActivatedCredentials = {
    accessToken: 'mock',
    refreshToken: 'mock'
  }

  let loginResponse = <LoginResponse> {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken'
  }

  let url = "http://localhost:8080/api/user/login";


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);
    httpController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return logged in passenger', () => {
    service.login(validPassengerCredentials.email, validPassengerCredentials.password).subscribe((res) => {
      expect(res).toEqual(loginResponse)
    })
    const req = httpController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(validPassengerCredentials);
    req.flush(loginResponse);
    httpController.verify();
  })
  it('should return logged in driver', () => {
    service.login(validDriverCredentials.email, validDriverCredentials.password).subscribe((res) => {
      expect(res).toEqual(loginResponse)
    })
    const req = httpController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(validDriverCredentials);
    req.flush(loginResponse);
    httpController.verify();
  })
  it('should return an error for invalid credentials', () => {
    const errorMessage = "Wrong username or password!";
  
    service.login(invalidCredentials.email, invalidCredentials.password).subscribe(() => {
      fail('Expected the request to fail');
    },
    (error) => {
      expect(error).toBeDefined();
      expect(error.status).toBe(400);
      expect(error.error.message).toBe(errorMessage);
    });
  
    const req = httpController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush({ message: errorMessage }, { status: 400, statusText: 'Bad Request' });
    httpController.verify();
  });
  it('should return an error for blocked user', () => {
    const errorMessage = "User is blocked";
  
    service.login(blockedCredentials.accessToken, blockedCredentials.refreshToken).subscribe(() => {
      fail('Expected the request to fail');
    },
    (error) => {
      expect(error).toBeDefined();
      expect(error.status).toBe(400);
      expect(error.error.error).toBe(errorMessage);
    });
  
    const req = httpController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush({ error: errorMessage }, { status: 400, statusText: 'Bad Request' });
    httpController.verify();
  });
  

});
