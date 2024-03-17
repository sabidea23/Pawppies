import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  constructor(private http: HttpClient) { }

  public createAnimal(animal: FormData) {
    return this.http.post(`${baseUrl}/animal/`, animal);
  }

  public updateAnimal(animal: any) {
    return this.http.put(`${baseUrl}/animal/`, animal);
  }

  public getAnimals() {
    return this.http.get(`${baseUrl}/animal/`);
  }

  public getAnimal(id: number) {
    return this.http.get(`${baseUrl}/animal/${id}`);
  }

  public getAnimalsByCenterId(centerId: number) {
    return this.http.get(`${baseUrl}/animal/center/${centerId}`);
  }

  public getAnimalsByAuthorId(authorId: number) {
    return this.http.get(`${baseUrl}/animal/author/${authorId}`);
  }

  public getAnimalsByCenterIdAndAuthorId(centerId: number, authorId: number) {
    return this.http.get(`${baseUrl}/animal/center/${centerId}/author/${authorId}`);
  }

  public deleteAnimal(id: number) {
    return this.http.delete(`${baseUrl}/animal/${id}`);
  }

  public getLikeStatus(animalId: number, userId: number) {
    return this.http.put(`${baseUrl}/animal/${animalId}/like/${userId}`, null);
  }

  public getLikedAnimals(userId: number) {
    return this.http.get(`${baseUrl}/animal/liked-animals/${userId}`);
  }
}
