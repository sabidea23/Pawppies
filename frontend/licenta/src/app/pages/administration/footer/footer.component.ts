import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer', templateUrl: './footer.component.html', styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private router: Router) {
  }

  redirectToFAQS() {
    this.router.navigate(['/faqs']).then((_) => {
    });

  }

  redirectToContact() {
    this.router.navigate(['/contact']).then((_) => {
    });

  }

  redirectToAboutPage() {
    this.router.navigate(['/about-pets']).then((_) => {
    });
  }

  redirectToMissionPage() {
    this.router.navigate(['/about-pets/mission']).then((_) => {
    });
  }

  redirectToAnimalCenter() {
    this.router.navigate(['/centers']).then((_) => {
    });
  }

  redirectToDogBreeds() {
    this.router.navigate(['/breed-details-dog']).then((_) => {
    });

  }

  redirectToDogAdoption() {
    this.router.navigate(['/adopt-dogs']).then((_) => {
    });

  }

  redirectToFeedDog() {
    this.router.navigate(['/feed-dog']).then((_) => {
    });

  }


  redirectToCatBreeds() {
    this.router.navigate(['/breed-details-cat']).then((_) => {
    });

  }

  redirectToCatAdoption() {
    this.router.navigate(['/adopt-cats']).then((_) => {
    });

  }

  redirectToFeedCat() {
    this.router.navigate(['/feed-cat']).then((_) => {
    });

  }

  redirectToCatHealth() {
    this.router.navigate(['/health-cat']).then((_) => { });

  }

  redirectToDogHealth() {
    this.router.navigate(['/health-dog']).then((_) => { });

  }
}
