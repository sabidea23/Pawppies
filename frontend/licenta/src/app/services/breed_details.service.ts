import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import baseUrl from "./helper";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Breed_detailsService {
  constructor(private http: HttpClient) { }

  public getAllBreeds(params: { page: number; size: number }): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', params.page.toString());
    queryParams = queryParams.append('size', params.size.toString());

    return this.http.get(`${baseUrl}/breed-details/`,  { params: queryParams });
  }

  public getBreedDetailsById(id: number) {
    return this.http.get(`${baseUrl}/breed-details/${id}`);
  }

  public getBreedDetailsByName(breedName: string) {
    return this.http.get(`${baseUrl}/breed-details/${breedName}`);
  }

  public getBreedDetailsByAnimalType(breedType: string) {
    return this.http.get(`${baseUrl}/breed-details/${breedType}`);
  }
}
