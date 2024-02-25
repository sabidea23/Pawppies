import {Component} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {SearchService} from "../../services/search.service";
import {countries} from "../../utils/country-data-store";
import {ReviewService} from "../../services/review.service";
import {ImageProcessingService} from "../../services/image-processing.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-mission', templateUrl: './mission.component.html', styleUrls: ['./mission.component.css']
})
export class MissionComponent {

  user = this.login.getUser();
  allReviews: any = [];
  likedReviews: any = [];

  searchData = {
    city: '', country: '', name: '', distance: ''
  };

  numberAnimalsLeft: any;

  showAnimals: any = [];

  linkSeeAnimals: any = 3;

  public countries: any = countries;

  constructor(private snack: MatSnackBar, private imageProcessingService: ImageProcessingService, private reviewService: ReviewService, private login: LoginService, private router: Router, private searchService: SearchService) {
  }

  goToAnimalsPage() {
    const user_role = this.login.getUserRole();
    if (user_role == 'ADMIN') this.router
      .navigate(['/admin/university-reviews'])
      .then((_) => {
      }); else if (user_role == 'NORMAL') this.router
      .navigate(['/user-dashboard/university-reviews'])
      .then((_) => {
      });
  }

  goToQuizPage() {
    const user_role = this.login.getUserRole();
    if (user_role == 'ADMIN') this.router
      .navigate(['/admin/quiz/'])
      .then((_) => {
      }); else if (user_role == 'NORMAL') this.router
      .navigate(['/user-dashboard/quiz/'])
      .then((_) => {
      });
  }

  performSearch() {
    // Setează filtrele de căutare în serviciu
    this.searchService.setSearchFilters(this.searchData);
    const user_role = this.login.getUserRole();
    if (user_role == 'ADMIN') this.router
      .navigate(['/admin/universities/'])
      .then((_) => {
      }); else if (user_role == 'NORMAL') this.router
      .navigate(['/user-dashboard/universities/'])
      .then((_) => {
      });
  }

  //see animals
  getImagesForReviews() {
    for (let i = 0; i < this.allReviews.length; i++) {
      this.allReviews[i] = this.imageProcessingService.createImage(this.allReviews[i]);
    }
  }

  getFavouriteReviews() {
    this.reviewService.getAllReviews().subscribe({
      next: (data) => {
        this.allReviews = data;
        this.displayRandomAnimals();
        this.getImagesForReviews();
      }, error: (_) => {
      },
    });
  }

  displayRandomAnimals(): void {
    if (this.allReviews.length <= 3) {
      this.showAnimals = [...this.allReviews];
    } else {
      let selectedIndices = new Set<number>();
      while (selectedIndices.size < 3) {
        let randomIndex = Math.floor(Math.random() * this.allReviews.length);
        selectedIndices.add(randomIndex);
      }

      this.showAnimals = [...selectedIndices].map(index => this.allReviews[index]);
      this.showAnimals.push(this.linkSeeAnimals);
    }
  }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.getFavouriteReviews();

    this.reviewService.getReviewsLikedByUser(this.user.id).subscribe({
      next: (data) => {
        this.likedReviews = data;
      },
    });
    this.numberAnimalsLeft = this.allReviews.length - this.showAnimals.length;
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
      }, error: (error) => {
        this.snack.open(error.error.message, 'OK', {
          duration: 3000,
        });
      },
    });
  }

}
