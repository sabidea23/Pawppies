import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  constructor(private http: HttpClient) {
  }

  public addAnimal(animal: any) {
    return this.http.post(`${baseUrl}/animal/`, animal);
  }

  public updateAnimal(animal: any) {
    return this.http.put(`${baseUrl}/animal/`, animal);
  }

  public getAllAnimals() {
    return this.http.get(`${baseUrl}/animal/`);
  }

  public getAnimalsByAnimalCenterId(animalCenterId: number) {
    return this.http.get(`${baseUrl}/animal/animal-center/${animalCenterId}`);
  }

  public getAnimalsByAuthorId(authorId: number) {
    return this.http.get(`${baseUrl}/animal/author/${authorId}`);
  }

  public getAnimalsByAnimalCenterIdAndAuthorId(animalCenterId: number, authorId: number) {
    return this.http.get(`${baseUrl}/animal/animal-center/${animalCenterId}/author/${authorId}`);
  }

  public deleteAnimalById(id: number) {
    return this.http.delete(`${baseUrl}/animal/${id}`);
  }
}
