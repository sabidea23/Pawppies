import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdoptionRequestService} from "../../services/adoption.request.service";
import {AnimalService} from "../../services/animal.service.";
import Swal from "sweetalert2";

@Component({
  selector: 'app-adoption-request',
  templateUrl: './adoption-request.component.html',
  styleUrls: ['./adoption-request.component.css']
})
export class AdoptionRequestComponent {
  adoptionData = new FormGroup({
    phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
    reason: new FormControl('', [Validators.required]),
    acknowledge: new FormControl(false, [Validators.requiredTrue])
  });

  user = this.login.getUser();

  public request = {
    firstName: this.user.firstName,
    lastName: this.user.lastName,
    email: this.user.email,
    phone: this.adoptionData.value.phone,
    reason: this.adoptionData.value.reason,
    animalRequestedId: '',
    userId: ''
  };

  animalId: any;

  constructor(private animalService: AnimalService, private route: ActivatedRoute, private adoptionRequestService: AdoptionRequestService, private snack: MatSnackBar, private login: LoginService, private router: Router) {
  }

  animal: any;
  requestsForAnimals: any;

  ngOnInit(): void {
    this.animalId = JSON.parse(this.route.snapshot.paramMap.get('animalId') || 'null') || undefined;
    // @ts-ignore
    this.animalService.getAnimal(this.animalId).subscribe({
      next: (data: any) => {
        this.animal = data;
      },
    });
  }

  getNumberRequestsForAnimals() {
    this.adoptionRequestService.getRequestsForAnimal(this.animalId).subscribe({
      next: (data: any) => {
        this.requestsForAnimals = data;

        // Verifică dacă există alte cereri pentru acest animal
        if (this.requestsForAnimals && this.requestsForAnimals.length > 0) {
          // Pregătirea mesajului pentru utilizator
          const message = `There are currently ${this.requestsForAnimals.length} other request(s) for this animal. There might be a delay before your visit is scheduled. Please make sure to check your notifications regularly.`;

          // Afișează un dialog de confirmare
          Swal.fire({
            title: 'Attention',
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Proceed',
            cancelButtonText: 'Cancel',
            background: 'rgb(230, 230, 230)'
          }).then((result) => {
            if (result.isConfirmed) {
              this.submitRequest();
            }
          });
        } else {
          // Dacă nu există alte cereri, trimite direct
          this.submitRequest();
        }
      }
    });
  }

  formSubmit() {
    this.request.animalRequestedId = this.animalId;
    this.request.userId = this.user.id;

    if (!this.adoptionData.value.phone || !this.adoptionData.value.reason) {
      this.snack.open('Please complete the fields correctly!', 'OK', {
        duration: 3000,
      });
      return;
    }

    if (!this.adoptionData.value.acknowledge) {
      this.snack.open('Acknowledgement is required.', 'OK', {
        duration: 3000,
      });
      return;
    }

    // Apelarea funcției pentru a obține numărul de cereri și pentru a gestiona logica de verificare
    this.getNumberRequestsForAnimals();
  }


// Metoda pentru trimiterea cererii
  submitRequest() {
    this.adoptionRequestService.submitAdoptionRequest(this.request).subscribe({
      next: () => {
        Swal.fire({
          title: 'Success!',
          text: 'Adoption Request was submitted successfully',
          icon: 'success',
          background: 'rgb(230, 230, 230)',
        }).then((_) => {
          this.router.navigate(['/animal']).then((_) => {
          });
        });
      }, error: (error) => {
        this.snack.open(error.error.message, 'OK', {
          duration: 3000,
        });
      },
    });
  }

}
