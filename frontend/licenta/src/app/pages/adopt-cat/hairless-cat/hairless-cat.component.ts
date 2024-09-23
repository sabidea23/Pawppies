import { Component } from '@angular/core';
import {Breed_detailsService} from "../../../services/breed_details.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageProcessingService} from "../../../services/image-processing.service";
import {AnimalService} from "../../../services/animal.service.";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hairless-cat',
  templateUrl: './hairless-cat.component.html',
  styleUrls: ['./hairless-cat.component.css']
})
export class HairlessCatComponent {
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

  cuteBreedsName = ['Sphynx', 'Peterbald', 'Donskoy', 'Minskin', 'Elf Cat']

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
