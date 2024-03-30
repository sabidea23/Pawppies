import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import baseUrl from "./helper";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnimalCenterService {
  constructor(private http: HttpClient) { }

  public createAnimalCenter(center: any) {
    return this.http.post(`${baseUrl}/center/`, center);
  }

  public updateAnimalCenter(center: any) {
    return this.http.put(`${baseUrl}/center/`, center);
  }

  public getAnimalCenters(params: { page: number; size: number }): Observable<any> {
    // Creează un nou HttpParams
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', params.page.toString());
    queryParams = queryParams.append('size', params.size.toString());

    // Trimite request-ul GET cu parametrii de paginare
    return this.http.get(`${baseUrl}/center/`, { params: queryParams });
  }

  public getAnimalCenter(id: number) {
    return this.http.get(`${baseUrl}/center/${id}`);
  }

  public getAnimalCentersName() {
    return this.http.get(`${baseUrl}/center/names`);
  }

  public deleteAnimalCenter(id: number) {
    return this.http.delete(`${baseUrl}/center/${id}`);
  }
}
