import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AnimalCenterService } from '../../services/animal.center.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import {countries} from "../../utils/country-data-store";
import {AnimalCenterModel} from "../../model/animal-center.model";

@Component({
  selector: 'app-animal-center-add',
  templateUrl: './animal-center-add.component.html',
  styleUrls: ['./animal-center-add.component.css'],
})
export class AnimalCenterAddComponent implements OnInit {
  user = this.login.getUser();
  public countries:any = countries;

  public animalCenter: AnimalCenterModel = {
    name: '',
    city: '',
    country: '',
    contact: '',
    admin: undefined,
    mission: '',
    longitude: 0.0,
    latitude: 0.0,
    phone: ''
  };

  public formInput: any = {
    name: '',
    city: '',
    country: '',
    contact: '',
    mission: '',
    longitude: '',
    latitude: '',
    phone: ''
  };

  constructor(
    private login: LoginService,
    private snack: MatSnackBar,
    private router: Router,
    private animalCenterService: AnimalCenterService,
  ) { }

  ngOnInit(): void {
    this.user = this.login.getUser();
  }

  public isFormValid() {
    return this.formInput.name && this.formInput.longitude &&
      this.formInput.latitude && this.formInput.city && this.formInput.contact
      && this.formInput.country && this.formInput.mission && this.formInput.phone;
  }

  formSubmit() {
    for (const key in this.formInput) {
      // @ts-ignore
      this.animalCenter[key] = this.formInput[key];
    }

    const backedUpAuthorities = this.user.authorities;
    this.user.authorities = undefined;

    this.animalCenter.admin = this.user;

    this.animalCenterService.createAnimalCenter(this.animalCenter).subscribe({
      next: (data) => {
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
        this.snack.open(error.error.message, 'OK', {
          duration: 3000,
        });
      },
    });
  }

  clearForm() {
    this.formInput.name = '';
    this.formInput.longitude = '';
    this.formInput.latitude = '';
    this.formInput.contact = '';
    this.formInput.city = '';
    this.formInput.country = '';
    this.formInput.mission = '';
    this.formInput.phone = '';
  }
}
