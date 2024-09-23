import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AnimalCenterService } from '../../services/animal.center.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { countries } from "../../utils/country-data-store";
import { AnimalCenterModel } from "../../model/animal-center.model";

@Component({
  selector: 'app-animal-center-add',
  templateUrl: './animal-center-add.component.html',
  styleUrls: ['./animal-center-add.component.css'],
})
export class AnimalCenterAddComponent implements OnInit {
  user = this.login.getUser();
  public countries: any = countries;
  // @ts-ignore
  public addCenterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private login: LoginService,
    private snack: MatSnackBar,
    private router: Router,
    private animalCenterService: AnimalCenterService
  ) { }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.initializeForm();
  }

  initializeForm(): void {
    this.addCenterForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      contact: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      mission: ['', Validators.required],
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      mondayOpen: ['', Validators.required],
      mondayClose: ['', Validators.required],
      tuesdayOpen: ['', Validators.required],
      tuesdayClose: ['', Validators.required],
      wednesdayOpen: ['', Validators.required],
      wednesdayClose: ['', Validators.required],
      thursdayOpen: ['', Validators.required],
      thursdayClose: ['', Validators.required],
      fridayOpen: ['', Validators.required],
      fridayClose: ['', Validators.required],
      saturdayOpen: ['', Validators.required],
      saturdayClose: ['', Validators.required],
      sundayOpen: ['', Validators.required],
      sundayClose: ['', Validators.required]
    });
  }

  formSubmit() {
    if (this.addCenterForm.valid) {
      const openingHours = {
        mondayOpen: this.addCenterForm.value.mondayOpen,
        mondayClose: this.addCenterForm.value.mondayClose,
        tuesdayOpen: this.addCenterForm.value.tuesdayOpen,
        tuesdayClose: this.addCenterForm.value.tuesdayClose,
        wednesdayOpen: this.addCenterForm.value.wednesdayOpen,
        wednesdayClose: this.addCenterForm.value.wednesdayClose,
        thursdayOpen: this.addCenterForm.value.thursdayOpen,
        thursdayClose: this.addCenterForm.value.thursdayClose,
        fridayOpen: this.addCenterForm.value.fridayOpen,
        fridayClose: this.addCenterForm.value.fridayClose,
        saturdayOpen: this.addCenterForm.value.saturdayOpen,
        saturdayClose: this.addCenterForm.value.saturdayClose,
        sundayOpen: this.addCenterForm.value.sundayOpen,
        sundayClose: this.addCenterForm.value.sundayClose,
      };

      // Prepare the data to send, merging form data with admin details
      const animalCenterData: AnimalCenterModel = {
        ...this.addCenterForm.value,
        openingHours: openingHours, // Attach the opening hours object

        admin: this.user,

      };

      // Backup user authorities (if any specific logic or data needs to be restored after submission)
      const backedUpAuthorities = this.user.authorities;
      this.user.authorities = undefined; // Temporarily unset authorities if needed for the submission logic

      // Log the complete data for debugging before sending to the server
      console.log(animalCenterData);

      // Send the data to the server via the AnimalCenterService
      this.animalCenterService.createAnimalCenter(animalCenterData).subscribe({
        next: (data) => {
          // Restore authorities back to the user after the successful operation
          this.user.authorities = backedUpAuthorities;
          Swal.fire({
            title: 'Success!',
            text: 'Animal Center added successfully',
            icon: 'success',
            background: 'rgb(230, 230, 230)',
          }).then((_) => {
            this.router.navigate(['/centers']).then((_) => { });
          });
        },
        error: (error) => {
          // In case of an error, also restore authorities
          this.user.authorities = backedUpAuthorities;
          this.snack.open(error.error.message, 'OK', {
            duration: 3000,
          });
        },
      });
    } else {
      this.snack.open('Please fill all required fields.', 'OK', {
        duration: 3000,
      });
    }
  }


  clearForm() {
    this.addCenterForm.reset();
  }
}
