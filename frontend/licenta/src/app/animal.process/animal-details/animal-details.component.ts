import { Component } from '@angular/core';
import {AnimalService} from "../../services/animal.service.";
import {ActivatedRoute, Router} from "@angular/router";
import {ImageProcessingService} from "../../services/image-processing.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent {
  animal: any;

  animalId: any;
  constructor(private sanitizer: DomSanitizer, private imageProcessingService: ImageProcessingService, private router: Router,  private route: ActivatedRoute, private animalService: AnimalService) { }

  ngOnInit() {
    this.animalId = JSON.parse(this.route.snapshot.paramMap.get('animalId') || '{}');
    this.animalService.getAnimal(this.animalId).subscribe(data => {
      this.animal = data;
      this.getImagesForAnimals();
      console.log(data)
    });

    this.startSlideShow();
  }

  getImagesForAnimals() {
      this.animal = this.imageProcessingService.createImage(this.animal);
  }

  currentImageIndex = 0;

  moveToNextImage() {
    if (this.currentImageIndex < this.animal.animalImages.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }

  getPreviousImageIndex() {
    // Imaginea de dinainte de cea curentă. Se întoarce la sfârșitul listei dacă suntem la prima imagine.
    return (this.currentImageIndex - 1 + this.animal.animalImages.length) % this.animal.animalImages.length;
  }

  getNextImageIndex() {
    // Imaginea de după cea curentă. Se întoarce la începutul listei dacă suntem la ultima imagine.
    return (this.currentImageIndex + 1) % this.animal.animalImages.length;
  }

  imageExists() {
    // Verifică dacă există imagini în array-ul animalImages
    return this.animal.animalImages && this.animal.animalImages.length >= 3;
  }

  moveToPreviousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.animal.animalImages.length - 1; // Sau păstrează pe prima imagine
    }
  }

  toggleFullScreen() {
    const elem = document.querySelector('.central-picture');
    if (!document.fullscreenElement) {
      // @ts-ignore
      elem.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  slideShowInterval: any;

  ngOnDestroy() {
    this.stopSlideShow();
  }

  startSlideShow() {
    const slideDuration = 3000; // Durata fiecărui slide în milisecunde
    this.slideShowInterval = setInterval(() => {
      this.moveToNextImage();
    }, slideDuration);
  }

  stopSlideShow() {
    clearInterval(this.slideShowInterval);
  }

  navigateToBreedPage() {
    if (this.animal.type == 'Dog') {
      this.router.navigate(['/breed-dog', {dogBreedId: this.animal.breedDetails.id}]).then((_) => {
      });
    } else if (this.animal.type == 'Cat')  {
      this.router.navigate(['/breed-cat', {catBreedId: this.animal.breedDetails.id}]).then((_) => {
      });
    }
  }

  getSafeUrl() {
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${this.animal.animalCenter.longitude - 0.005},${this.animal.animalCenter.latitude - 0.005},${this.animal.animalCenter.longitude + 0.005},${this.animal.animalCenter.latitude + 0.005}&layer=mapnik&marker=${this.animal.animalCenter.latitude},${this.animal.animalCenter.longitude}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  redirectToAnimalCenter() {
    this.router
      .navigate(['/center-details', {centerId: this.animal.animalCenter.id},]);
  }
}
