import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from "./helper";

@Injectable({
  providedIn: 'root'
})
export class AdoptionRequestService {

  constructor(private http: HttpClient) {}

  submitAdoptionRequest(adoptionRequestDTO: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/adopt-request/submit`, adoptionRequestDTO);
  }

  getAnimalFromRequest(requestId: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/adopt-request/animal-from-request/${requestId}`);
  }

  getAdoptionRequestFromUserAndAnimalIds(animalId: number, userId: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/adopt-request/animal/${animalId}/user/${userId}`);
  }

  getRequestsForAnimal(animalId: number): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/adopt-request/animal/${animalId}`);
  }

  getAdoptedRequestById(requestId: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/adopt-request/request/${requestId}`);
  }

  getAdoptedRequestByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/adopt-request/user/${userId}`);
  }

  getAdoptionRequestPendingForAnimalId(animalId: number): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/adopt-request/pending/animal/${animalId}`);
  }

  getAdoptedRequestPendingForAnimalId(animalId: number): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/adopt-request/pending-adopted/animal/${animalId}`);
  }

  updatePendingRequests(requestId: number): Observable<any> {
    return this.http.put<any>(`${baseUrl}/adopt-request/update-pending/${requestId}`, {});
  }


  acceptRequest(requestId: number): Observable<void> {
    return this.http.put<void>(`${baseUrl}/adopt-request/accept/${requestId}`, {});
  }

  rejectRequest(requestId: number): Observable<void> {
    return this.http.put<void>(`${baseUrl}/adopt-request/reject/${requestId}`, {});
  }

  cancelRequest(requestId: number): any {
    console.log(requestId)
    return this.http.delete(`${baseUrl}/adopt-request/cancel/${requestId}`, {});
  }

  getRequestsForAnimalCenterId(animalCenterId: number): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/adopt-request/center/${animalCenterId}`);
  }

  getUserForRequest(userId: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/adopt-request/user-from-request/${userId}`);
  }
}
