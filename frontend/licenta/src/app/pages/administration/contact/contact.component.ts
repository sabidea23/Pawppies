import {Component} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageProcessingService} from "../../../services/image-processing.service";
import {AnimalService} from "../../../services/animal.service.";
import {LoginService} from "../../../services/login.service";
import {Router} from "@angular/router";
import {SearchService} from "../../../services/search.service";
import {countries} from "../../../utils/country-data-store";
import Swal from "sweetalert2";
import {ContactServiceComponent} from "../../../services/contact.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-contact', templateUrl: './contact.component.html', styleUrls: ['./contact.component.css']
})
export class ContactComponent {
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

  constructor(private userService: UserService, private contactService: ContactServiceComponent, private snack: MatSnackBar, private imageProcessingService: ImageProcessingService, private animalService: AnimalService, private login: LoginService, private router: Router, private searchService: SearchService) {
  }

  goToAnimalsPage() {
    this.router
      .navigate(['/animal'])
      .then((_) => {
      });
  }

  goToQuizPage() {
    this.router
      .navigate(['/quiz/'])
      .then((_) => {
      });
  }

  performSearch() {
    this.searchService.setSearchFilters(this.searchData);
    this.router
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
        // @ts-ignore
        this.animals = this.animals.filter(animal => animal.isAdopted == false)
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

  contactData: any = {
    inputFirstName: undefined,
    inputLastName: undefined,
    inputEmail: undefined,
    inputSubject: undefined,
    inputMessage: undefined
  }

  contact: any = {
    firstName: undefined, lLastName: undefined, email: undefined, subject: undefined, message: undefined
  }

  submitContactForm() {
    this.contact.firstName = this.contactData.inputFirstName;
    this.contact.lLastName = this.contactData.inputLastName;
    this.contact.email = this.contactData.inputEmail;
    this.contact.message = this.contactData.inputMessage;
    this.contact.subject = this.contactData.inputSubject;
    this.contactService.submitFormContact(this.contact).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Success!', text: 'Form submitted successfully', icon: 'success', background: 'rgb(230, 230, 230)',
        });
      }
    });
    this.clearField();
  }

  clearField() {
    this.contactData.inputLastName = '';
    this.contactData.inputSubject = '';
    this.contactData.inputFirstName = '';
    this.contactData.inputMessage = '';
    this.contactData.inputEmail = '';
  }
}
