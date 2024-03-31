import { Component } from '@angular/core';
import {AnimalService} from "../../services/animal.service.";
import {ActivatedRoute, Router} from "@angular/router";
import {ImageProcessingService} from "../../services/image-processing.service";

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent {
  animal: any;

  animalId: any;
  constructor(private imageProcessingService: ImageProcessingService, private router: Router,  private route: ActivatedRoute, private animalService: AnimalService) { }

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

  moveToPreviousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.animal.animalImages.length - 1; // Sau păstrează pe prima imagine
    }
  }

  toggleFullScreen() {
    const elem = document.querySelector('.image-container img');
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
}
