import { Component } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AnimalCenterService} from "../../services/animal.center.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageProcessingService} from "../../services/image-processing.service";
import {AnimalService} from "../../services/animal.service.";

@Component({
  selector: 'app-center-details',
  templateUrl: './center-details.component.html',
  styleUrls: ['./center-details.component.css']
})
export class CenterDetailsComponent {


  constructor(private animalCenterService:AnimalCenterService, private login: LoginService, private snack: MatSnackBar, private sanitizer: DomSanitizer, private imageProcessingService: ImageProcessingService, private router: Router,  private route: ActivatedRoute, private animalService: AnimalService) { }

  animalCenterId:any;
  animalCenter:any;
  user = this.login.getUser();

  numberAnimalsLeft: any;

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.animalCenterId = JSON.parse(this.route.snapshot.paramMap.get('centerId') || '{}');
    this.animalCenter = this.animalCenterService
      .getAnimalCenter(this.animalCenterId)
      .subscribe({
        next: (data) => {
          this.animalCenter = data;
          console.log(data);
        },
      });

    this.getFavouriteAnimals();

    this.animalService.getLikedAnimals(this.user.id).subscribe({
      next: (data) => {
        this.likedAnimals = data;
      },
    });
    this.numberAnimalsLeft = this.animals.length - this.showAnimals.length;

  }

  showDirections() {
    if (this.user == null) {
      this.router
        .navigate(['/login', {centerId: this.animalCenterId},]);
    }
    const destinationLatitude = this.animalCenter.latitude;
    const destinationLongitude = this.animalCenter.longitude;

    const userLatitude = this.user.latitude;
    const userLongitude = this.user.longitude;

    const directionUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&travelmode=driving`;

    window.open(directionUrl, "_blank");
  }


  getSafeUrl() {
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${this.animalCenter.longitude - 0.005},${this.animalCenter.latitude - 0.005},${this.animalCenter.longitude + 0.005},${this.animalCenter.latitude + 0.005}&layer=mapnik&marker=${this.animalCenter.latitude},${this.animalCenter.longitude}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goToAllAnimalsPage() {
    this.router
      .navigate(['/animal'])
      .then((_) => {
      });
  }

  linkSeeAnimals: any = 3;

  showAnimals: any = [];
  animals: any = [];
  likedAnimals: any = [];

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
        // @ts-ignore
        this.animals = this.animals.filter(animal => animal.isAdopted == false)
        this.displayAnimalsFromAnimalCenter();
        this.getimagesShowAnimals();
      }, error: (_) => {
      },
    });
  }

  animalCenterAnimals:any[] = [];

  displayAnimalsFromAnimalCenter(): void {
    // @ts-ignore
    // @ts-ignore
    const filterAnimals = this.animals.filter(animal => animal.animalCenter.id == this.animalCenter.id)
    if (this.animals.length <= 5) {
      this.animalCenterAnimals = [...filterAnimals];
    } else {
      let selectedIndices = new Set<number>();
      while (selectedIndices.size < 5) {
        let randomIndex = Math.floor(Math.random() * filterAnimals.length);
        selectedIndices.add(randomIndex);
      }

      this.animalCenterAnimals = [...selectedIndices].map(index => filterAnimals[index]);
      this.animalCenterAnimals.push(this.linkSeeAnimals);
    }
  }

  public goToAnimalsFromAnimalCenterPage() {
    this.router
      .navigate(['/animal', {centerId: this.animalCenter.id},])
      .then((_) => {
      });
  }

  navigateToAnimalDetails(animal: any) {
    this.router.navigate(['/animal-details', {animalId: animal.id}]);
  }
}
