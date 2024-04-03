import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageProcessingService} from "../../../services/image-processing.service";
import {AnimalService} from "../../../services/animal.service.";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import {SearchService} from "../../../services/search.service";
import {Breed_detailsService} from "../../../services/breed_details.service";

@Component({
  selector: 'app-cutest-dogs',
  templateUrl: './cutest-dogs.component.html',
  styleUrls: ['./cutest-dogs.component.css']
})
export class CutestDogsComponent  implements OnInit{
  constructor(private breedDetailsService: Breed_detailsService, private snack: MatSnackBar, private imageProcessingService: ImageProcessingService, private animalService: AnimalService, private login: LoginService, private router: Router, private searchService: SearchService) {
  }

  ngOnInit() {
    this.getAllBreeds();
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


  // @ts-ignore
  redirectToAnimalPage(dog) {
    // Presupunând că dog.breed conține rasa selectată
    this.router.navigate(['/animal/'], { queryParams: { type: 'Dog', breed: dog.name } });
  }

  viewDogDetails(dog: any) {
    this.router.navigate(['/breed-dog', {dogBreedId: dog.id}]).then((_) => {
    });
  }

  cuteDogs: any = [];

  cuteBreedsName = ['French Bulldog', 'Beagle', 'Pembroke Welsh Corgi', 'Golden Retriever', 'Dachshund', 'Bernese Mountain Dog',
  'Yorkshire Terrier', 'Cavalier King Charles Spaniel',
  'Pug', 'Pomeranian', 'Bichon Frise', 'Siberian Husky', 'American Eskimo']
  filterBreeds() {
  // @ts-ignore
    this.cuteDogs = this.cuteDogs.filter(animal => this.cuteBreedsName.includes(animal.name))
  }

  getAllBreeds() {
    this.breedDetailsService.getBreedDetailsByAnimalType("DOG")
      .subscribe(data => {
        this.cuteDogs = data;
        this.filterBreeds(); // Aplică orice filtru existent
      }, error => {
        console.log(error.error.message);
      });
  }
}
