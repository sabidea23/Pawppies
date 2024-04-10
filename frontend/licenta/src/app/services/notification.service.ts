import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }

  public createNotification(notificationRequest: any): Observable<any> {
    return this.http.post(`${baseUrl}/notification/`, notificationRequest);
  }

  public getAllNotifications(): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/notification/`);
  }

  public getNotificationsByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${baseUrl}/notification/${userId}`);
  }

  public userReadNotificationById(userId: number, notificationId: number): Observable<void> {
    return this.http.put<void>(`${baseUrl}/notification/${userId}/read/${notificationId}`, null);
  }
}
