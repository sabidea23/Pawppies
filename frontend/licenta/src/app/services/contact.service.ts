import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: 'root'
})
export class ContactServiceComponent {
  constructor(private http: HttpClient) { }

  public submitFormContact(contact: any) {
    return this.http.post(`${baseUrl}/contact/`, contact);
  }
}
