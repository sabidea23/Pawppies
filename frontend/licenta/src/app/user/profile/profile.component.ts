import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {UserService} from '../../services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {countries} from "../../utils/country-data-store";
import {AdoptionRequestService} from "../../services/adoption.request.service";
import {forkJoin, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ImageProcessingService} from "../../services/image-processing.service";

@Component({
  selector: 'app-profile', templateUrl: './profile.component.html', styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {


  public countries: any = countries;

  editForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    city: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),

  });

  public userInput: any = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    street: '',
    country: '',
    city: '',
    confirmPassword: this.editForm.value.confirmPassword
  };

  user: any;

  selectedTab: string = 'aboutMe';
  requests: any = null;

  animal: any;

  constructor(private imageProcessingService: ImageProcessingService, private route: ActivatedRoute,
              private login: LoginService, private snack: MatSnackBar, private router: Router, private userService: UserService,
              private adoptionRequests: AdoptionRequestService) {

    this.user = this.login.getUser();

    console.log(this.user)
    this.getUserRequests();
    const section = JSON.parse(this.route.snapshot.paramMap.get('section') || '{}');
    if (section == 3) {
      this.selectedTab = 'adoptionRequests';
    } else {
      this.selectedTab = 'aboutMe';
    }
  }

  getImagesForUser() {
    if (this.user.adoptedAnimals.length > 0) {
      for (let i = 0; i < this.user.adoptedAnimals.length; i++) {
        this.user.adoptedAnimals[i] = this.imageProcessingService.createImage(this.user.adoptedAnimals[i]);
      }
    }
  }

  goToAnimalPage(animal: any) {
    this.router.navigate(['/animal-details', {animalId: animal.id}]).then((_) => {
    });
  }

  getImagesForAnimals() {
    for (let i = 0; i < this.requests.length; i++) {
      this.requests[i].animal = this.imageProcessingService.createImage(this.requests[i].animal);
    }
  }

  getUserRequests() {

    this.adoptionRequests.getAdoptedRequestByUserId(this.user.id).subscribe({
      next: (requests: any[]) => {
        if (requests.length > 0) {
          // Combina solicitările pentru a prelua detalii despre fiecare animal asociat fiecărei cereri
          const requestsWithAnimals = requests.map(request => {
            return this.adoptionRequests.getAnimalFromRequest(request.id).pipe(catchError(error => {
                console.error('Error fetching animal details', error);
                return of(null); // Gestionează erorile pentru a nu întrerupe întregul flux
              }), map(animal => ({...request, animal})) // Combinați cererea cu detaliile animalului
            );
          });

          forkJoin(requestsWithAnimals).subscribe(completeRequests => {
            this.requests = completeRequests;
            this.getImagesForAnimals();
            console.log(this.requests)

          });

        } else {
          this.requests = [];
          console.log('No adoption requests found for this user.');
        }
      }, error: (err) => {
        this.snack.open('Failed to load adoption requests!', 'OK', {duration: 3000});
        console.error('Error loading adoption requests:', err);
      }
    });
  }

  calculateDueDate(date: Date): Date {
    const result = new Date(date); // Crează o nouă instanță de dată pentru a evita modificarea originalului
    result.setDate(result.getDate() + 5); // Adaugă 5 zile
    return result;
  }

  cancelRequest(request: any) {

    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to cancel this request?',
      icon: 'warning',
      background: '#fff',
      customClass: {
        confirmButton: 'confirm-button-class', cancelButton: 'cancel-button-class'
      },
      showCancelButton: true,
      confirmButtonText: 'DELETE',
      cancelButtonText: 'CANCEL',
      cancelButtonColor: '#6504B5',
      confirmButtonColor: '#FF1053',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adoptionRequests.cancelRequest(request).subscribe({
          next: () => {
            this.getUserRequests();
          }
        });
      }
    });
  }

  public getUserRole() {
    return this.login.getUserRole();
  }

  ngOnInit(): void {
    if (this.login.isLoggedIn()) {
      this.login.getCurrentUser().subscribe({
        next: (user: any) => {
          this.login.setUser(user);
          this.user = user;
          this.userInput.firstName = user.firstName;
          this.userInput.lastName = user.lastName;
          this.userInput.email = user.email;
          this.userInput.phone = user.phone;
          this.userInput.street = user.street;
          this.userInput.city = user.city;
          this.userInput.country = user.country;
          this.getImagesForUser()

        },

        error: (err) => {
          this.snack.open('Failed to load user data!', 'OK', {duration: 3000});
          console.error('Error loading user data:', err);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  formSubmit() {
    if (this.userInput.firstName == '' || this.userInput.firstName == null) {
      this.snack.open('First name cannot be empty!', 'OK', {
        duration: 3000,
      });
      return;
    }

    if (this.userInput.lastName == '' || this.userInput.lastName == null) {
      this.snack.open('Last name cannot be empty!', 'OK', {
        duration: 3000,
      });
      return;
    }

    if (this.userInput.email == '' || this.userInput.email == null) {
      this.snack.open('Email cannot be empty!', 'OK', {
        duration: 3000,
      });
      return;
    }


    if (this.userInput.password != this.userInput.confirmPassword) {
      this.snack.open('Oops! The passwords you entered do not match. Please try again.', 'OK', {
        duration: 3000,
      });
      return;
    }

    for (const key in this.userInput) {
      if (this.userInput[key] !== this.user[key]) {
        this.user[key] = this.userInput[key];
      }
    }

    const backedUpAuthorities = this.user.authorities;
    this.user.authorities = undefined;
    this.userService.updateUser(this.user).subscribe({
      next: (data) => {
        this.user.authorities = backedUpAuthorities;
        this.login.setUser(this.user);

        Swal.fire({
          title: 'Success!',
          text: 'User profile modified successfully',
          icon: 'success',
          background: 'rgb(230, 230, 230)',
        }).then((_) => {
          this.router.navigate(['/profile']).then((_) => {
          });
        });
      }, error: (error) => {
        this.snack.open(error.error.message, 'OK', {
          duration: 3000,
        });
      },
    });
  }


  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }

  goToQuizPage() {
    const user_role = this.login.getUserRole();
    if (user_role == 'NORMAL') this.router
      .navigate(['/quiz/'])
      .then((_) => {
      });
  }

  goToAnimalsPage() {
    this.router
      .navigate(['/animal'])
      .then((_) => {
      });
  }
}
