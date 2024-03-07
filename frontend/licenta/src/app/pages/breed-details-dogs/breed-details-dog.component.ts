import {Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Breed_detailsService} from "../../services/breed_details.service";

@Component({
  selector: 'app-breed-details',
  templateUrl: './breed-details-dog.component.html',
  styleUrls: ['./breed-details-dog.component.css']
})
export class BreedDetailsDogComponent implements OnInit {


  user = this.login.getUser();
  breeds: any = [];
  dogBreeds: any = [];
  totalElements: number = 84;
  filters: any = {
    size: [],
    activityLevel: [],
    exerciseRequirements: [],
    vocality: [],
    affectionForOwners: [],
    groomingRequirements: [],
    easeOfTraining: [],
    friendliness: []
  };

  constructor(private login: LoginService, private router: Router, private snack: MatSnackBar, private breedDetailsService: Breed_detailsService) {
  }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.getAllBreeds();
  }

  getAllBreeds() {
    this.breedDetailsService.getAllBreeds()
      .subscribe(data => {
        this.breeds = data;
        console.log(this.breeds)
        this.filterBreeds(); // Aplică orice filtru existent
      }, error => {
        console.log(error.error.message);
      });
  }

  applyFilter(category: string, value: string): void {
    if (this.filters[category].includes(value)) {
      // @ts-ignore
      this.filters[category] = this.filters[category].filter(item => item !== value);
    } else {
      this.filters[category].push(value);
    }
    this.filterBreeds();
  }

  filterBreeds(): void {
    // @ts-ignore
    this.dogBreeds = this.breeds.filter(breed => {
      return this.isBreedValid(breed) && this.getVocalityLevel(breed) && this.isactivityLevelValid(breed) && this.getgroomingRequirementsLevel(breed) && this.getaffectionForOwnersLevel(breed) && this.geteaseOfTrainingLevel(breed) && this.exerciseRequirementsLevel(breed) && this.getFriendliness(breed);})
      // @ts-ignore
      .filter(breed => breed.animalType === 'DOG')
    this.totalElements = this.dogBreeds.length;
  }

  isBreedValid(breed: any): boolean {
    // Verifică dimensiunea
    return !(this.filters.size.length > 0 && !this.filters.size.includes(this.getSize(breed)));
  }

  isactivityLevelValid(breed: any): boolean {
    let activityLevel = '';
    if (breed.activityLevel >= 1 && breed.activityLevel <= 2) {
      activityLevel = 'Low';
    } else if (breed.activityLevel === 3) {
      activityLevel = 'Moderate';
    } else if (breed.activityLevel >= 4 && breed.activityLevel <= 5) {
      activityLevel = 'High';
    }

    // Verifică dacă nivelul de energie calculat se potrivește cu unul dintre filtrele selectate
    return !(this.filters.activityLevel && this.filters.activityLevel.length > 0 && !this.filters.activityLevel.includes(activityLevel));
  }

  getSize(breed: any): string {
    let maxHeightCm = this.inchesToCm(breed.maxHeight);
    let maxWeightKg = this.poundsToKg(breed.maxWeight);

    if (maxHeightCm <= 43.18 && maxWeightKg <= 6.804) {
      return 'Small';
    } else if (maxHeightCm <= 60.96 && maxWeightKg <= 15.876) {
      return 'Medium';
    } else if (maxHeightCm <= 68.58 && maxWeightKg <= 29.4835) {
      return 'Large';
    } else {
      return 'Extra Large';
    }

  }

  geteaseOfTrainingLevel(breed: any): boolean {
    let easeOfTraining = '';

    if (breed.easeOfTraining === 1 || breed.easeOfTraining === 2) {
      easeOfTraining = 'Easy';
    } else if (breed.easeOfTraining === 3) {
      easeOfTraining = 'Average';
    } else if (breed.easeOfTraining === 4 || breed.easeOfTraining === 5) {
      easeOfTraining = 'Difficult';
    }

    return !(this.filters.easeOfTraining && this.filters.easeOfTraining.length > 0 && !this.filters.easeOfTraining.includes(easeOfTraining));
  }

  getFriendliness(breed: any): boolean {
    let friendlinessToOtherPets = breed.friendlinessToOtherPets && (breed.friendlinessToOtherPets === 4 || breed.friendlinessToOtherPets === 5) ? 'Toward Dogs' : '';
    let friendlinessToChildren = breed.friendlinessToChildren && (breed.friendlinessToChildren === 4 || breed.friendlinessToChildren === 5) ? 'Toward Children' : '';

    // Verifică dacă cel puțin una dintre categoriile de friendliness este selectată
    if (this.filters.friendliness && this.filters.friendliness.length > 0) {
      return this.filters.friendliness.includes(friendlinessToOtherPets) || this.filters.friendliness.includes(friendlinessToChildren);
    }

    return true;  // Dacă niciun filtru de friendliness nu este selectat, rasa este considerată validă
  }



  getgroomingRequirementsLevel(breed: any): boolean {
    let groomingRequirements = '';
    if (breed.groomingRequirements === 1 || breed.groomingRequirements === 2) {
      groomingRequirements = 'Low';
    } else if (breed.groomingRequirements === 3) {
      groomingRequirements = 'Moderate';
    } else if (breed.groomingRequirements === 4 || breed.groomingRequirements === 5) {
      groomingRequirements = 'High';
    }

    return !(this.filters.groomingRequirements && this.filters.groomingRequirements.length > 0 && !this.filters.groomingRequirements.includes(groomingRequirements));


  }

  getVocalityLevel(breed: any): boolean {
    let vocality = '';
    if (breed.vocality === 1 || breed.vocality === 2) {
      vocality = 'Low';
    } else if (breed.vocality === 3) {
      vocality = 'Moderate';
    } else if (breed.vocality === 4 || breed.vocality === 5) {
      vocality = 'High';
    }

    return !(this.filters.vocality && this.filters.vocality.length > 0 && !this.filters.vocality.includes(vocality));
  }

  exerciseRequirementsLevel(breed: any): any {
    let exerciseRequirements = '';

    if (breed.exerciseRequirements === 1 || breed.exerciseRequirements === 2) {
      exerciseRequirements = 'Moderate';
    } else if (breed.exerciseRequirements === 3) {
      exerciseRequirements = 'Significant';
    } else if (breed.exerciseRequirements === 4 || breed.exerciseRequirements === 5) {
      exerciseRequirements = 'Rigorous';
    }

    return !(this.filters.exerciseRequirements && this.filters.exerciseRequirements.length > 0 && !this.filters.exerciseRequirements.includes(exerciseRequirements));
  }

  getaffectionForOwnersLevel(breed: any): any {
    let affectionForOwners = '';
    if (breed.affectionForOwners === 1 || breed.affectionForOwners === 2) {
      affectionForOwners = 'Independent';
    } else if (breed.affectionForOwners === 3) {
      affectionForOwners = 'Balanced';
    } else if (breed.affectionForOwners === 4 || breed.affectionForOwners === 5) {
      affectionForOwners = 'Cuddly';
    }

    return !(this.filters.affectionForOwners && this.filters.affectionForOwners.length > 0 && !this.filters.affectionForOwners.includes(affectionForOwners));
  }


  inchesToCm(inches: string): number {
    return parseFloat(inches) * 2.54;
  }

  poundsToKg(pounds: string): number {
    return parseFloat(pounds) * 0.45359237;
  }

}
