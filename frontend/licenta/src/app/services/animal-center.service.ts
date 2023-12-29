import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: 'root'
})
export class AnimalCenterService {
  constructor(private http: HttpClient) {
  }

  public addAnimalCenter(animalCenter: any) {
    return this.http.post(`${baseUrl}/animal-center/`, animalCenter);
  }

  public updateAnimalCenter(animalCenter: any) {
    return this.http.put(`${baseUrl}/animal-center/`, animalCenter);
  }

  public getAllAnimalCentera() {
    return this.http.get(`${baseUrl}/animal-center/`);
  }

  public getAnimalCenterById(id: number) {
    return this.http.get(`${baseUrl}/animal-center/${id}`);
  }

  public deleteAnimalCenterById(id: number) {
    return this.http.delete(`${baseUrl}/animal-center/${id}`);
  }
}
