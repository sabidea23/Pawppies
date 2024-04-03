import {Component} from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AnimalCenterService} from "../../../services/animal.center.service";

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

  redirectToPrivaacyPolicy() {
    this.router.navigate(['/privacy-policy']).then((_) => {
    });
  }

  redirectToTermsofService() {
    this.router.navigate(['/terms-of-service']).then((_) => {
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


  redirecttoCatBehaviour() {
    this.router.navigate(['/admin/behavior-cat']).then((_) => { });

  }

  redirectToCatHealth() {
    this.router.navigate(['/health-cat']).then((_) => { });

  }

  redirectToDogHealth() {
    this.router.navigate(['/health-dog']).then((_) => { });

  }

  redirecToDogTraining() {
    this.router.navigate(['/training-dog']).then((_) => { });

  }
}
