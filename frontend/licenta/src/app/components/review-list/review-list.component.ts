import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReviewService } from '../../services/review.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
export class ReviewListComponent implements OnInit {
  university: any = undefined;
  user = this.login.getUser();
  allReviews: any = [];
  universityId: any;
  userId: any;
  likedReviews: any = [];

  constructor(
    private login: LoginService,
    private reviewService: ReviewService,
    private router: Router,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private universityService: UniversityService
  ) {
  }

  getFavouriteReviews() {
    if (this.universityId && this.userId) {
      this.reviewService
        .getReviewsByUniversityIdAndAuthorId(this.universityId, this.userId)
        .subscribe({
          next: (data) => {
            this.allReviews = data;
          },
          error: (_) => { },
        });
    } else if (this.universityId) {
      this.reviewService.getReviewsByUniversityId(this.universityId).subscribe({
        next: (data) => {
          this.allReviews = data;
        },
        error: (_) => { },
      });
    } else if (this.userId) {
      this.reviewService.getReviewsLikedByUser(this.user.id).subscribe({
        next: (data) => {
          this.allReviews = data;
        },
      });
    } else {
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

    this.getFavouriteReviews();

    this.reviewService.getReviewsLikedByUser(this.user.id).subscribe({
      next: (data) => {
        this.likedReviews = data;
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

  public likeReview(review: any) {
    this.reviewService.likeReview(review.id, this.user.id).subscribe({
      next: (updatedReview: any) => {
        // Update liked reviews
        this.reviewService.getReviewsLikedByUser(this.user.id).subscribe({
          next: (data) => {
            this.likedReviews = data;
          },
        });

        review.likes = updatedReview.likes;
      },
      error: (error) => {
        this.snack.open(error.error.message, 'OK', {
          duration: 3000,
        });
      },
    });
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
            }).then(() => {});
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
