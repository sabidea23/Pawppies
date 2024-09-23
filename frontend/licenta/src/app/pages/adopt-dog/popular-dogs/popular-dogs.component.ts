import {Component} from '@angular/core';
import {Breed_detailsService} from "../../../services/breed_details.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageProcessingService} from "../../../services/image-processing.service";
import {AnimalService} from "../../../services/animal.service.";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-popular-dogs',
  templateUrl: './popular-dogs.component.html',
  styleUrls: ['./popular-dogs.component.css']
})
export class PopularDogsComponent {
  constructor(private breedDetailsService: Breed_detailsService, private snack: MatSnackBar, private imageProcessingService: ImageProcessingService, private animalService: AnimalService, private login: LoginService, private router: Router) {
  }

  ngOnInit() {
    this.getAllBreeds();
  }

  isFullTextShown = false;

  toggleTextDisplay() {
    this.isFullTextShown = !this.isFullTextShown;
  }


  // @ts-ignore
  redirectToAnimalPage(dog) {
    // Presupunând că dog.breed conține rasa selectată
    this.router.navigate(['/animal/'], {queryParams: {type: 'Dog', breed: dog.name}});
  }

  viewDogDetails(dog: any) {
    this.router.navigate(['/breed-dog', {dogBreedId: dog.id}]).then((_) => {
    });
  }

  cuteDogs: any = [];

  cuteBreedsName = ['Pug', 'French Bulldog', 'Cavalier King Charles Spaniel', 'Golden Retriever', 'Beagle', 'Poodle', 'Boxer', 'Labrador Retriever', 'Yorkshire Terrier', 'Bulldogs']

  filterBreeds() {
    // @ts-ignore
    this.cuteDogs = this.cuteDogs.filter(animal => this.cuteBreedsName.includes(animal.name.trim()))
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
