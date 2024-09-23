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

  public updateAnimal(animalId: number, animal: any, imageFiles?: File[]): any {
    const formData: FormData = new FormData();

    // Adăugați detaliile animalului în FormData
    formData.append('animal', new Blob([JSON.stringify(animal)], {
      type: 'application/json'
    }));

    // Adăugați fișierele de imagine în FormData, dacă există
    if (imageFiles && imageFiles.length) {
      Array.from(imageFiles).forEach((file, index) => {
        formData.append(`imageFile`, file, file.name);
      });
    }

    return this.http.put(`${baseUrl}/animal/${animalId}`, formData);
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
