import { Component } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AnimalCenterService} from "../../services/animal.center.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(
    private router: Router
  ) { }

  redirectToFAQS() {
    this.router.navigate(['/faqs']).then((_) => { });

  }

  redirectToContact() {
    this.router.navigate(['/contact']).then((_) => { });

  }
}
