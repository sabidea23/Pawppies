import { Component } from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageProcessingService} from "../../../../services/image-processing.service";
import {AnimalService} from "../../../../services/animal.service.";
import {LoginService} from "../../../../services/login.service";
import {Router} from "@angular/router";
import {SearchService} from "../../../../services/search.service";
import {countries} from "../../../../utils/country-data-store";

@Component({
  selector: 'app-about-cat',
  templateUrl: './about-cat.component.html',
  styleUrls: ['./about-cat.component.css']
})
export class AboutCatComponent {

  searchData = {
    city: '',
    country: '',
    name: '',
    distance: ''
  };

  numberAnimalsLeft: any;

  ngOnInit() {
    this.getFavouriteAnimals();

    this.animalService.getLikedAnimals(this.user.id).subscribe({
      next: (data) => {
        this.likedAnimals = data;
      },
    });
    this.numberAnimalsLeft = this.animals.length - this.showAnimals.length;
  }

  public countries: any = countries;

  constructor(private userService: UserService, private snack: MatSnackBar, private imageProcessingService: ImageProcessingService, private animalService: AnimalService, private login: LoginService, private router: Router, private searchService: SearchService) {
  }
  goToPawppiesMission() {
    this.router
      .navigate(['/about-pets/mission'])
      .then((_) => {
      });
  }

  goToQuizPage() {
    const user_role = this.login.getUserRole();
    if (user_role == 'NORMAL') this.router
      .navigate(['/quiz/'])
      .then((_) => {
      });
  }

  performSearch() {
    // Setează filtrele de căutare în serviciu
    this.searchService.setSearchFilters(this.searchData);
    this.router
      .navigate(['/centers/'])
      .then((_) => {
      });
  }


  displayRandomAnimals(): void {
    if (this.animals.length <= 3) {
      this.showAnimals = [...this.animals];
    } else {
      let selectedIndices = new Set<number>();
      while (selectedIndices.size < 3) {
        let randomIndex = Math.floor(Math.random() * this.animals.length);
        selectedIndices.add(randomIndex);
      }

      this.showAnimals = [...selectedIndices].map(index => this.animals[index]);
      this.showAnimals.push(this.linkSeeAnimals);
    }
  }
  showAnimals: any = [];
  linkSeeAnimals: any = 3;

  user = this.login.getUser();
  animals: any = [];
  likedAnimals: any = [];

  navigateToAnimalDetails(animal: any) {
    if (this.user && this.user.id) {
      // Verifică dacă utilizatorul este autentificat și adaugă animalul la vizualizate recent
      this.userService.addRecentlyViewedAnimal(this.user.id, animal.id).subscribe({
        next: () => {
          console.log('Animal added to recently viewed');
        },
        error: (error) => {
          console.error('Error adding animal to recently viewed', error);
        }
      });
    }
    this.router.navigate(['/animal-details', {animalId: animal.id}]);
  }

  goToAnimalsPage() {
    this.router
      .navigate(['/animal'])
      .then((_) => {
      });
  }

  public likeAnimal(event: MouseEvent, animal: any) {
    event.stopPropagation(); // Oprește propagarea evenimentului

    this.animalService.getLikeStatus(animal.id, this.user.id).subscribe({
      next: (updatedAnimal: any) => {
        this.animalService.getLikedAnimals(this.user.id).subscribe({
          next: (data) => {
            this.likedAnimals = data;
          },
        });

        animal.likes = updatedAnimal.likes;
      }, error: (error) => {
        this.snack.open(error.error.message, 'OK', {
          duration: 3000,
        });
      },
    });
  }

  public isLiked(animal: any) {
    return this.likedAnimals.some((r: any) => r.id === animal.id);
  }

  getimagesShowAnimals() {
    for (let i = 0; i < this.animals.length; i++) {
      this.animals[i] = this.imageProcessingService.createImage(this.animals[i]);
    }
  }

  getFavouriteAnimals() {
    this.animalService.getAnimals().subscribe({
      next: (data) => {
        this.animals = data;
        this.displayRandomAnimals();
        this.getimagesShowAnimals();
      }, error: (_) => {
      },
    });
  }

  navigateToAnimalCenters() {
    this.router.navigate(['/centers']);

  }

  navigateToDogBreedsPage(){
    this.router.navigate(['/breed-details-dog']);

  }

  navigateToCatBreedsPage(){
    this.router.navigate(['/breed-details-cat']);

  }

  navigateToFAQSPage() {
    this.router.navigate(['/faqs']);

  }

  navigateToCatAdoption(){
    this.router.navigate(['/adopt-cats']);

  }

  navigateToDogAdoptionPage(){
    this.router.navigate(['/adopt-dogs']);

  }

}
