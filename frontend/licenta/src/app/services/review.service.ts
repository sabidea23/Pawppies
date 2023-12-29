import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import baseUrl from "./helper";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) { }

  public addReview(review: any) {
    return this.http.post(`${baseUrl}/review/`, review);
  }

  public updateReview(review: any) {
    return this.http.put(`${baseUrl}/review/`, review);
  }

  public getAllReviews() {
    return this.http.get(`${baseUrl}/review/`);
  }

  public getReviewById(id: number) {
    return this.http.get(`${baseUrl}/review/${id}`);
  }

  public getReviewsByUniversityId(universityId: number) {
    return this.http.get(`${baseUrl}/review/university/${universityId}`);
  }

  public getReviewsByAuthorId(authorId: number) {
    return this.http.get(`${baseUrl}/review/author/${authorId}`);
  }

  public getReviewsByUniversityIdAndAuthorId(universityId: number, authorId: number) {
    return this.http.get(`${baseUrl}/review/university/${universityId}/author/${authorId}`);
  }

  public deleteReviewById(id: number) {
    return this.http.delete(`${baseUrl}/review/${id}`);
  }

  public likeReview(reviewId: number, userId: number) {
    return this.http.put(`${baseUrl}/review/${reviewId}/like/${userId}`, null);
  }

  public getReviewsLikedByUser(userId: number) {
    return this.http.get(`${baseUrl}/review/liked-reviews/${userId}`);
  }
}
