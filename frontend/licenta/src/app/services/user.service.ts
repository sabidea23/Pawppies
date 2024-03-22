import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }

  public updateUserRole(username: string, role: string) {
    return this.http.put(`${baseUrl}/user/${username}/role/${role}`, null);
  }

  public getAllUsers() {
    return this.http.get(`${baseUrl}/user/`);
  }

  public updateUser(user: any) {
    return this.http.put(`${baseUrl}/user/`, user);
  }
}
