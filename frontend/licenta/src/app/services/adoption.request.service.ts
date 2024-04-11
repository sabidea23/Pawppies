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

  deleteRequest(requestId: number): Observable<void> {
    return this.http.delete<void>(`${baseUrl}/adopt-request/delete/${requestId}`);
  }

  acceptRequest(requestId: number): Observable<void> {
    return this.http.put<void>(`${baseUrl}/adopt-request/accept/${requestId}`, {});
  }

  rejectRequest(requestId: number): Observable<void> {
    return this.http.put<void>(`${baseUrl}/adopt-request/reject/${requestId}`, {});
  }

  cancelRequest(requestId: number): Observable<void> {
    return this.http.put<void>(`${baseUrl}/adopt-request/cancel/${requestId}`, {});
  }
}
