import {Component} from '@angular/core';
import {AnimalService} from "../../services/animal.service.";
import {ActivatedRoute, Router} from "@angular/router";
import {ImageProcessingService} from "../../services/image-processing.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../services/login.service";
import {AdoptionRequestService} from "../../services/adoption.request.service";

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent {
  animal: any;

  animalId: any;

  numberAnimalsLeft: any;
  requestsByUser: any = null;

  constructor(private adoptionRequest: AdoptionRequestService, private login: LoginService, private snack: MatSnackBar, private sanitizer: DomSanitizer, private imageProcessingService: ImageProcessingService, private router: Router, private route: ActivatedRoute, private animalService: AnimalService) {
    this.animalId = JSON.parse(this.route.snapshot.paramMap.get('animalId') || '{}');
    this.animalService.getAnimal(this.animalId).subscribe({
      next: (data) => {
        this.animal = data;
        this.getImagesForAnimals();
        this.checkAlreadySubmittedRequest();
      }
    });
  }


  ngOnInit() {
    this.startSlideShow();
    this.numberAnimalsLeft = this.animals.length - this.showAnimals.length;
  }

  checkAlreadySubmittedRequest() {

    if (this.user && this.animalId) {
      this.adoptionRequest.getAdoptionRequestFromUserAndAnimalIds(this.animalId, this.user.id).subscribe({
        next: (data) => {
          this.requestsByUser = data;
        }
      });
    }
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
    } else if (this.animal.type == 'Cat') {
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

  redirectToPurina() {
    window.location.href = 'https://www.purina.com/pet-food-finder-direct?utm_campaign=nbm-petfoodfinder2022&utm_medium=display&utm_source=petfinder&utm_content=cr-pff_petfinder_listing_dog_pt-na&utm_term=';
  }

  redirectToRoyal() {
    window.location.href = 'https://www.royalcanin.com/us/pet-food-finder';
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

  getimagesShowAnimals() {
    for (let i = 0; i < this.animals.length; i++) {
      this.animals[i] = this.imageProcessingService.createImage(this.animals[i]);
    }
  }


  animalCenterAnimals: any[] = [];

  displayAnimalsFromAnimalCenter(): void {
    // @ts-ignore
    // @ts-ignore
    const filterAnimals = this.animals.filter(animal => animal.animalCenter.id == this.animal.animalCenter.id).filter(animal2 => animal2.type == this.animal.type)
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

  navigateToFaqs() {
    this.router.navigate(['/faqs']);
  }


  goToProfileRequests() {
    this.router.navigate(['/profile', {section: 3}]);
  }

  redirectToAdoptDogs() {
    this.router.navigate(['/adopt-dogs']);

  }

  redirecttoAdoptCats() {
    this.router.navigate(['/adopt-cats']);

  }

  startAdoptionProcess() {
    if (!this.user) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/adoption-request', {animalId: this.animal.id}]);
    }
  }
}
