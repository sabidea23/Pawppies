import { Component } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageProcessingService} from "../../services/image-processing.service";
import {AnimalService} from "../../services/animal.service.";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-cutest-dogs',
  templateUrl: './cutest-dogs.component.html',
  styleUrls: ['./cutest-dogs.component.css']
})
export class CutestDogsComponent {
  constructor(private snack: MatSnackBar, private imageProcessingService: ImageProcessingService, private animalService: AnimalService, private login: LoginService, private router: Router, private searchService: SearchService) {
  }


  goToQuizPage() {
    this.router
      .navigate(['/quiz/'])
      .then((_) => {
      });
  }

  isFullTextShown = false;
  toggleTextDisplay() {
    this.isFullTextShown = !this.isFullTextShown;
  }

}
