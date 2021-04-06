import { BASE_URL } from './../app.constants';
import { HttpClientService } from './http-client.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamePlayService {

  constructor(
    private httpClient: HttpClientService
  ) { }
  public getPlayerDetails() {
    return this.httpClient.get(BASE_URL + 'getPlayerDetails');
  }
  public getOnlinePlayerDetails() {
    return this.httpClient.get(BASE_URL + 'getOnlinePlayers');
  }
}
