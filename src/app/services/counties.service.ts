import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountiesService {

  url: string = 'https://restcountries.com/v3.1/'
  constructor(
    private httClient: HttpClient
  ) { }

  allCountries(): Promise<any[]> {
    return lastValueFrom(this.httClient.get<any[]>(this.url + 'region/europe'))
  }
}
