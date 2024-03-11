import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  constructor(private http: HttpClient) { }

  public createAnimal(animal: FormData) {
    return this.http.post(`${baseUrl}/review/`, animal);
  }

  public updateAnimal(animal: any) {
    return this.http.put(`${baseUrl}/review/`, animal);
  }

  public getAnimals() {
    return this.http.get(`${baseUrl}/review/`);
  }

  public getAnimal(id: number) {
    return this.http.get(`${baseUrl}/review/${id}`);
  }

  public getAnimalsByCenterId(universityId: number) {
    return this.http.get(`${baseUrl}/review/university/${universityId}`);
  }

  public getAnimalsByAuthorId(authorId: number) {
    return this.http.get(`${baseUrl}/review/author/${authorId}`);
  }

  public getAnimalsByCenterIdAndAuthorId(universityId: number, authorId: number) {
    return this.http.get(`${baseUrl}/review/university/${universityId}/author/${authorId}`);
  }

  public deleteAnimal(id: number) {
    return this.http.delete(`${baseUrl}/review/${id}`);
  }

  public getLikeStatus(reviewId: number, userId: number) {
    return this.http.put(`${baseUrl}/review/${reviewId}/like/${userId}`, null);
  }

  public getLikedAnimals(userId: number) {
    return this.http.get(`${baseUrl}/review/liked-reviews/${userId}`);
  }
}
