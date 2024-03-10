import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AnimalCenterService } from '../../services/animal-center.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import {countries} from "../../utils/country-data-store";

@Component({
  selector: 'app-university-add',
  templateUrl: './university-add.component.html',
  styleUrls: ['./university-add.component.css'],
})
export class UniversityAddComponent implements OnInit {
  user = this.login.getUser();
  universities: any = [];
  public countries:any = countries;

  public university: any = {
    name: '',
    city: '',
    country: '',
    contact: '',
    admin: undefined,
    longitude: 0.0,
    latitude: 0.0,
  };

  public formInput: any = {
    name: '',
    city: '',
    country: '',
    contact: '',
    longitude: '',
    latitude: '',
  };

  constructor(
    private login: LoginService,
    private snack: MatSnackBar,
    private router: Router,
    private universityService: AnimalCenterService,
  ) { }

  ngOnInit(): void {
    this.user = this.login.getUser();
    // this.universityService.getAllUniversities({}).subscribe({
    //   next: (data: any) => {
    //     this.universities = data;
    //   },
    // });
  }



  public isFormValid() {
    return this.formInput.name && this.formInput.longitude &&
      this.formInput.latitude && this.formInput.city && this.formInput.contact && this.formInput.country;
  }

  formSubmit() {
    for (const key in this.formInput) {
      this.university[key] = this.formInput[key];
    }

    const backedUpAuthorities = this.user.authorities;
    this.user.authorities = undefined;

    this.university.admin = this.user;

    this.universityService.createAnimalCenter(this.university).subscribe({
      next: (data) => {
        this.user.authorities = backedUpAuthorities;

        Swal.fire({
          title: 'Success!',
          text: 'Animal Center added successfully',
          icon: 'success',
          background: 'rgb(230, 230, 230)',
        }).then((_) => {
          this.router.navigate(['/admin/universities']).then((_) => { });
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
  }
}
