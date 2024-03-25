import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import baseUrl from "./helper";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Breed_detailsService {
  constructor(private http: HttpClient) { }

  public getAllBreeds() {
    return this.http.get(`${baseUrl}/breed-details/`);
  }

  public getBreedDetailsById(id: number) {
    return this.http.get(`${baseUrl}/breed-details/${id}`);
  }

  public getBreedDetailsByName(breedName: string) {
    return this.http.get(`${baseUrl}/breed-details/name/${breedName}`);
  }

  public getBreedDetailsByAnimalType(breedType: string) {
    return this.http.get(`${baseUrl}/breed-details/type/${breedType}`);
  }
}
