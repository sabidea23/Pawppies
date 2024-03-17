import {Component} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {SearchService} from "../../services/search.service";
import {countries} from "../../utils/country-data-store";
import {AnimalService} from "../../services/animal.service.";
import {ImageProcessingService} from "../../services/image-processing.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-mission', templateUrl: './mission.component.html', styleUrls: ['./mission.component.css']
})
export class MissionComponent {

  user = this.login.getUser();
  animals: any = [];
  likedAnimals: any = [];

  searchData = {
    city: '', country: '', name: '', distance: ''
  };

  numberAnimalsLeft: any;

  showAnimals: any = [];

  linkSeeAnimals: any = 3;

  public countries: any = countries;

  constructor(private snack: MatSnackBar, private imageProcessingService: ImageProcessingService, private animalService: AnimalService, private login: LoginService, private router: Router, private searchService: SearchService) {
  }

  goToAnimalsPage() {
    const user_role = this.login.getUserRole();
    if (user_role == 'ADMIN') this.router
      .navigate(['/university-reviews'])
      .then((_) => {
      }); else if (user_role == 'NORMAL') this.router
      .navigate(['/university-reviews'])
      .then((_) => {
      });
  }

  goToQuizPage() {
    const user_role = this.login.getUserRole();
    if (user_role == 'ADMIN') this.router
      .navigate(['/quiz/'])
      .then((_) => {
      }); else if (user_role == 'NORMAL') this.router
      .navigate(['/quiz/'])
      .then((_) => {
      });
  }

  performSearch() {
    // Setează filtrele de căutare în serviciu
    this.searchService.setSearchFilters(this.searchData);
    const user_role = this.login.getUserRole();
    if (user_role == 'ADMIN') this.router
      .navigate(['/centers/'])
      .then((_) => {
      }); else if (user_role == 'NORMAL') this.router
      .navigate(['/centers/'])
      .then((_) => {
      });
  }

  //see animals
  getImagesForAnimals() {
    for (let i = 0; i < this.animals.length; i++) {
      this.animals[i] = this.imageProcessingService.createImage(this.animals[i]);
    }
  }

  getFavouriteAnimals() {
    this.animalService.getAnimals().subscribe({
      next: (data) => {
        this.animals = data;
        this.displayRandomAnimals();
        this.getImagesForAnimals();
      }, error: (_) => {
      },
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

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.getFavouriteAnimals();

    this.animalService.getLikedAnimals(this.user.id).subscribe({
      next: (data) => {
        this.likedAnimals = data;
      },
    });
    this.numberAnimalsLeft = this.animals.length - this.showAnimals.length;
  }

  public isLiked(animal: any) {
    return this.likedAnimals.some((r: any) => r.id === animal.id);
  }

  public likeAnimal(animal: any) {
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

}
