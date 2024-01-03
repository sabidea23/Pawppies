import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { ReviewService } from '../../../services/review.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UniversityService } from 'src/app/services/university.service';
import {FileModel} from "../../../model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";

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
    reviewImages: []
  };

  constructor(
    private login: LoginService,
    private snack: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private universityService: UniversityService,
    private sanitazer: DomSanitizer
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

    const backedUpUserAuthorities = this.user.authorities;
    this.user.authorities = undefined;

    this.review.author = this.user;
    this.review.university = this.university;

    const backedUpAdminAuthorities = this.university.admin.authorities;
    this.university.admin.authorities = undefined;

    const reviewFormData = this.prepareFormData(this.review)
    this.reviewService.addReview(reviewFormData).subscribe({
      next: (data) => {
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


  prepareFormData(review: any): FormData {
    const formData = new FormData();

    formData.append(
      'review',
      new Blob([JSON.stringify(review)], {type: 'application/json'})
    );

    for(var i = 0; i < review.reviewImages.length; i++) {
      formData.append(
        'imageFile',
        review.reviewImages[i].file,
        review.reviewImages[i].file.name
      );
    }

    return formData;
  }


  onFileSelected({event}: { event: any }) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandler : FileModel = {
        file: file,
        url: this.sanitazer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }

      this.review.reviewImages.push(fileHandler);
    }
  }
}
