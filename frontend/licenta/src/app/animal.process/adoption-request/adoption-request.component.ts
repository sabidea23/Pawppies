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

  ngOnInit(): void {
    this.animalId = JSON.parse(this.route.snapshot.paramMap.get('animalId') || 'null') || undefined;
    // @ts-ignore
    this.animalService.getAnimal(this.animalId).subscribe({
      next: (data: any) => {
        this.animal = data;
      },
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
