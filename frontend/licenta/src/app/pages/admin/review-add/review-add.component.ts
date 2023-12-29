import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { ReviewService } from '../../../services/review.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.css'],
})
export class ReviewAddComponent implements OnInit {
  user = this.login.getUser();
  universityId: any = undefined;
  university: any = undefined;

  inputText: string = '';

  public review: any = {
    university: undefined,
    author: undefined,
  };

  constructor(
    private login: LoginService,
    private snack: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private universityService: UniversityService,
  ) {}

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.universityId = JSON.parse(
      this.route.snapshot.paramMap.get('universityId') || '{}'
    );
    this.university = this.universityService
      .getUniversityById(this.universityId)
      .subscribe({
        next: (data) => {
          this.university = data;
        },
      });
  }

  formSubmit() {
    this.review['text'] = this.inputText;

    // Remove authorities from user object before sending to server, as the server cannot deserialize it (for now)
    const backedUpUserAuthorities = this.user.authorities;
    this.user.authorities = undefined;

    this.review.author = this.user;
    this.review.university = this.university;

    // Remove authorities from university admin object before sending to server, as the server cannot deserialize it (for now)
    const backedUpAdminAuthorities = this.university.admin.authorities;
    this.university.admin.authorities = undefined;

    this.reviewService.addReview(this.review).subscribe({
      next: (data) => {
        // Restore authorities, maybe it will be needed later
        this.user.authorities = backedUpUserAuthorities;
        this.university.admin.authorities = backedUpAdminAuthorities;

        this.snack.open('Review added successfully', 'OK', {
          duration: 3000,
        });
        const user_role = this.login.getUserRole();
        if (user_role == 'ADMIN')
          this.router
            .navigate([
              '/admin/universities/',
              { universityId: this.universityId },
            ])
            .then((_) => { });
        else if (user_role == 'NORMAL')
          this.router
            .navigate([
              '/user-dashboard/universities/',
              { universityId: this.universityId },
            ])
            .then((_) => { });
      },
      error: (error) => {
        this.snack.open(error.error.message, 'OK', {
          duration: 3000,
        });
      },
    });
  }
}
