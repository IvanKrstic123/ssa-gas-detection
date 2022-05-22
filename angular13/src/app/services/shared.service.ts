import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private http: HttpClient) {}

  public getCities(): Observable<string[]> {
    return this.http.get<string[]>('https://localhost:5001/gas-emissions/cities');
  }

  public getCityInformation(name: string): Observable<City> {
    return this.http.get<City>(`https://localhost:5001/gas-emissions/city/${name}`)
  }

  public getAllCities(): Observable<City[]> {
    return this.http.get<City[]>("https://localhost:5001/gas-emissions");
  }
}
