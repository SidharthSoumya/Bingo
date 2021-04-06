import { Router } from '@angular/router';
import { HttpClientService } from './http-client.service';
import { BASE_URL } from './../app.constants';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private httpClient: HttpClientService,
    private router: Router
  ) { }

  public register(data) {
    return this.httpClient.postFD(BASE_URL + 'register', data);
  }
  public login(data) {
    return this.http.post(BASE_URL + 'login', data);
  }
  public logout() {
    return this.httpClient.get(BASE_URL + 'logout');
  }
  public isSessionAvailable() {
    if (localStorage.getItem('access_token') !== '') {
      return true;
    } else {
      return false;
    }
  }

}
