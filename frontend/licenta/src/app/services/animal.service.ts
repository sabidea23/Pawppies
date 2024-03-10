import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  constructor(private http: HttpClient) {
  }

  public createAnimal(review: FormData) {
    return this.http.post(`${baseUrl}/review/`, review);
  }

  public updateAnimal(review: any) {
    return this.http.put(`${baseUrl}/review/`, review);
  }

  public getAnimals() {
    return this.http.get(`${baseUrl}/review/`);
  }

  public getAnimalsByCenterId(universityId: number) {
    return this.http.get(`${baseUrl}/review/university/${universityId}`);
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
