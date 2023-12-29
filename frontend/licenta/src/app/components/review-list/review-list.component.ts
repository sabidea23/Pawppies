import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewService } from '../../services/review.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { GuidelinesService } from 'src/app/services/guidelines.service';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
export class ReviewListComponent implements OnInit {
  university: any = undefined;
  user = this.login.getUser();
  ownReviews: any = [];
  allReviews: any = [];
  universityId: any;
  userId: any;
  likedReviews: any = [];
  dislikedReviews: any = [];

  constructor(
    private login: LoginService,
    private reviewService: ReviewService,
    private router: Router,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private guidelinesService: GuidelinesService,
    private universityService: UniversityService
  ) {
  }

  hydrateAllReviews() {
    if (this.universityId && this.userId) {
      // Get reviews by university id and author id
      this.reviewService
        .getReviewsByUniversityIdAndAuthorId(this.universityId, this.userId)
        .subscribe({
          next: (data) => {
            this.allReviews = data;
          },
          error: (_) => { },
        });
    } else if (this.universityId) {
      // Get reviews by university id
      this.reviewService.getReviewsByUniversityId(this.universityId).subscribe({
        next: (data) => {
          this.allReviews = data;
        },
        error: (_) => { },
      });
    } else if (this.userId) {
      // Get reviews by author id
      this.reviewService.getReviewsByAuthorId(this.userId).subscribe({
        next: (data) => {
          this.allReviews = data;
        },
        error: (_) => { },
      });
    } else {
      // Get all reviews
      this.reviewService.getAllReviews().subscribe({
        next: (data) => {
          this.allReviews = data;
        },
        error: (_) => { },
      });
    }
  }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.universityId =
      JSON.parse(this.route.snapshot.paramMap.get('universityId') || 'null') ||
      undefined;

    this.userId =
      JSON.parse(this.route.snapshot.paramMap.get('userId') || 'null') ||
      undefined;

    this.university = this.universityId
      ? this.universityService.getUniversityById(this.universityId).subscribe({
        next: (data) => {
          this.university = data;
        },
      })
      : undefined;

    this.hydrateAllReviews();

    // Get own reviews
    this.reviewService.getReviewsByAuthorId(this.user.id).subscribe({
      next: (data) => {
        this.ownReviews = data;
      },
      error: (_) => { },
    });

    this.reviewService.getReviewsLikedByUser(this.user.id).subscribe({
      next: (data) => {
        this.likedReviews = data;
      },
    });

    this.reviewService.getReviewsDislikedByUser(this.user.id).subscribe({
      next: (data) => {
        this.dislikedReviews = data;
      },
    });
  }

  public enableSummOnlyOnUniver() {
    return this.router.url.includes('universityId');
  }

  public getUserRole() {
    return this.login.getUserRole();
  }

  public goToAddReview() {
    const user_role = this.login.getUserRole();
    if (user_role == 'ADMIN')
      this.router
        .navigate([
          '/admin/university-reviews/add',
          { universityId: this.universityId },
        ])
        .then((_) => { });
    else if (user_role == 'NORMAL')
      this.router
        .navigate([
          '/user-dashboard/university-reviews/add',
          { universityId: this.universityId },
        ])
        .then((_) => { });
  }

  public isLiked(review: any) {
    return this.likedReviews.some((r: any) => r.id === review.id);
  }

  public isDisliked(review: any) {
    return this.dislikedReviews.some((r: any) => r.id === review.id);
  }

  public likeReview(review: any) {
    this.reviewService.likeReview(review.id, this.user.id).subscribe({
      next: (updatedReview: any) => {
        // Update liked reviews
        this.reviewService.getReviewsLikedByUser(this.user.id).subscribe({
          next: (data) => {
            this.likedReviews = data;
          },
        });

        // Update disliked reviews
        this.reviewService.getReviewsDislikedByUser(this.user.id).subscribe({
          next: (data) => {
            this.dislikedReviews = data;
          },
        });

        review.likes = updatedReview.likes;
        review.dislikes = updatedReview.dislikes;
      },
      error: (error) => {
        this.snack.open(error.error.message, 'OK', {
          duration: 3000,
        });
      },
    });
  }

  public dislikeReview(review: any) {
    this.reviewService.dislikeReview(review.id, this.user.id).subscribe({
      next: (updatedReview: any) => {
        // Update liked reviews
        this.reviewService.getReviewsLikedByUser(this.user.id).subscribe({
          next: (data) => {
            this.likedReviews = data;
          },
        });

        // Update disliked reviews
        this.reviewService.getReviewsDislikedByUser(this.user.id).subscribe({
          next: (data) => {
            this.dislikedReviews = data;
          },
        });

        review.likes = updatedReview.likes;
        review.dislikes = updatedReview.dislikes;
      },
      error: (error) => {
        this.snack.open(error.error.message, 'OK', {
          duration: 3000,
        });
      },
    });
  }

  public hasEditRights(review: any) {
    return (
      this.login.getUserRole() == 'ADMIN' ||
      this.ownReviews.some((r: any) => r.id == review.id)
    );
  }

  public editReview(review: any) {
    Swal.fire({
      width: '800px',
      title: 'Edit Animal Description',
      background: 'rgb(230, 230, 230)',
      html: `
      <textarea
        id="swal-input"
        class="swal2-input"
        style="width: 90%; height: 275px; font-size: 16px;"
        placeholder="Text">
        ${review.text.trim()}
      </textarea>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const text = (document.getElementById('swal-input') as HTMLInputElement).value.trim();
        return { text };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        review.text = result.value.text;

        this.reviewService.updateReview(review).subscribe({
          next: (_) => {
            // Actualizează lista de review-uri
            this.allReviews = this.allReviews.map((r: any) => {
              if (r.id === review.id) {
                r = review;
              }
              return r;
            });
            Swal.fire({
              title: 'Edited!',
              text: 'The review has been edited',
              icon: 'success',
              background: 'rgb(230, 230, 230)',
            });
          },
          error: (error) => {
            this.snack.open(error.error.message, 'OK', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  public deleteReview(review: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this review!',
      icon: 'warning',
      background: 'rgb(230, 230, 230)',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it.',
    }).then((result) => {
      if (result.isConfirmed) {
        this.reviewService.deleteReviewById(review.id).subscribe({
          next: (_) => {
            this.allReviews = this.allReviews.filter(
              (r: any) => r.id !== review.id
            );
            Swal.fire({
              title: 'Deleted!',
              text: 'The review has been deleted.',
              icon: 'success',
              background: 'rgb(230, 230, 230)',
            }).then((_) => {
              window.location.reload();
            });
          },
          error: (error) => {
            this.snack.open(error.error.message, 'OK', {
              duration: 3000,
            });
          },
        });
      }
    });
  }
}
