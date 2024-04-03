import { Component, HostListener } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageProcessingService} from "../../../services/image-processing.service";
import {AnimalService} from "../../../services/animal.service.";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private userService: UserService,  private login: LoginService, private snack: MatSnackBar, private sanitizer: DomSanitizer, private imageProcessingService: ImageProcessingService, private router: Router,  private route: ActivatedRoute, private animalService: AnimalService) { }

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


  goToAnimalsPage() {
    this.router
      .navigate(['/animal'])
      .then((_) => {
      });
  }

  linkSeeAnimals: any = 3;

  showAnimals: any = [];

  recentlyViewedAnimals:any = [];

  animals: any = [];
  likedAnimals: any = [];

  getRecentlyViewedPets() {
    if (this.user ) {
      const userId = this.user.id;

      this.userService.getRecentlyViewedAnimals(userId).subscribe({
        next: (animalIds: any) => {
          this.loadAnimalDetails(animalIds);
        },
        error: (error) => {
          console.error('Error fetching recently viewed animals', error);
          // Gestionează eroarea corespunzător
        }
      });
    }
  }

  loadAnimalDetails(animalIds: number[]) {
    this.recentlyViewedAnimals = [];

    animalIds.forEach(animalId => {
      this.animalService.getAnimal(animalId).subscribe({
        next: (animalDetail) => {
          animalDetail= this.imageProcessingService.createImage(animalDetail);
          this.recentlyViewedAnimals.push(animalDetail);

          // Acum ai detalii pentru fiecare animal și poți actualiza interfața utilizatorului corespunzător.
        },
        error: (error) => {
          console.error(`Error fetching details for animal with ID ${animalId}`, error);
          // Gestionează eroarea corespunzător
        }
      });
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

  user = this.login.getUser();

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
        this.getRecentlyViewedPets();
        this.getimagesShowAnimals();
      }, error: (_) => {
      },
    });
  }


  goToAnimalCenterPage() {
    this.router.navigate(['/centers']).then((_) => { });

  }

  goToDogAnimalPage() {
    this.router.navigate(['/animal/'], { queryParams: { type: 'Dog'} });

  }

  goToCatAnimalPage() {
    this.router.navigate(['/animal/'], { queryParams: { type: 'Cat'} });
  }

  goToMissionPage() {
    this.router
      .navigate(['/about-pets/mission'])
      .then((_) => {
      });
  }

  goToDogBreedPage() {
    this.router.navigate(['/breed-details-dog']).then((_) => { });

  }

  goToCatBreedsPage() {
    this.router.navigate(['/breed-details-cat']).then((_) => { });
  }

  goToContactPage() {
    this.router.navigate(['/contact']).then((_) => { });
  }

  goToFaqs() {
    this.router.navigate(['/faqs']).then((_) => { });
  }

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
}
