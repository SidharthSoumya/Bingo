import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from './../app.constants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(
    private http: HttpClient
  ) { }
  public post(url: string, data: object, opt?: object): Observable<any> {
    const accessToken = localStorage.getItem('access_token')
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + accessToken);
    const options = opt ? opt : {
        headers: headers,
        params: {}
    };
    return this.http.post(url, data, options);
  }
  postFD(url: string, data: FormData, opt?: object): Observable<any> {
    const headers = new HttpHeaders()
    const options = opt ? opt : {
        headers: headers,
        params: {}
    };
    console.log('data..................>>>>', data);
    return this.http.post(url, data, options);
  }
  public get(url: string, opt?: object): Observable<any> {
    const accessToken = localStorage.getItem('access_token')
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + accessToken);
    const options = opt ? opt : {
        headers: headers,
        params: {}
    };
    return this.http.get(url, options);
  }
}
