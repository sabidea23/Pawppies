import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import baseUrl from "./helper";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  constructor(private http: HttpClient) { }

  public addUniversity(university: any) {
    return this.http.post(`${baseUrl}/university/`, university);
  }

  public updateUniversity(university: any) {
    return this.http.put(`${baseUrl}/university/`, university);
  }

  public getAllUniversities(params: { page: number; size: number }): Observable<any> {
    // Creează un nou HttpParams
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', params.page.toString());
    queryParams = queryParams.append('size', params.size.toString());

    // Trimite request-ul GET cu parametrii de paginare
    return this.http.get(`${baseUrl}/university/`, { params: queryParams });
  }

  public getUniversityById(id: number) {
    return this.http.get(`${baseUrl}/university/${id}`);
  }

  public deleteUniversityById(id: number) {
    return this.http.delete(`${baseUrl}/university/${id}`);
  }
}
