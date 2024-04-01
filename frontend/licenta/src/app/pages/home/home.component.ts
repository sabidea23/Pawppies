import { Component, HostListener } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageProcessingService} from "../../services/image-processing.service";
import {AnimalService} from "../../services/animal.service.";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private login: LoginService, private snack: MatSnackBar, private sanitizer: DomSanitizer, private imageProcessingService: ImageProcessingService, private router: Router,  private route: ActivatedRoute, private animalService: AnimalService) { }

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
  animals: any = [];
  likedAnimals: any = [];

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


  goToAnimalCenterPage() {
    this.router.navigate(['/centers']).then((_) => { });

  }

  goToDogAnimalPage() {
    this.router.navigate(['/animal/'], { queryParams: { type: 'Dog'} });

  }

  goToCatAnimalPage() {
    this.router.navigate(['/animal/'], { queryParams: { type: 'Cat'} });
  }
}
