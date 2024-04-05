import {Component} from '@angular/core';
import {Breed_detailsService} from "../../../services/breed_details.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageProcessingService} from "../../../services/image-processing.service";
import {AnimalService} from "../../../services/animal.service.";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-fluffy-cat', templateUrl: './fluffy-cat.component.html', styleUrls: ['./fluffy-cat.component.css']
})
export class FluffyCatComponent {
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
    this.router.navigate(['/animal/'], {queryParams: {type: 'Cat', breed: dog.name}});
  }

  viewDogDetails(dog: any) {
    this.router.navigate(['/breed-cat', {catBreedId: dog.id}]).then((_) => {
    });
  }

  cuteDogs: any = [];

  cuteBreedsName = ['Maine Coon', 'Munchkin','Persian', 'Ragdoll', 'Scottish Fold', 'Norwegian Forest Cat', 'Himalayan',
  'Manx', 'Ragamuffin', 'Birman']

  filterBreeds() {
    // @ts-ignore
    this.cuteDogs = this.cuteDogs.filter(animal => this.cuteBreedsName.includes(animal.name.trim()))
  }

  getAllBreeds() {
    this.breedDetailsService.getBreedDetailsByAnimalType("CAT")
      .subscribe(data => {
        this.cuteDogs = data;
        this.filterBreeds();
      }, error => {
        console.log(error.error.message);
      });
  }
}
