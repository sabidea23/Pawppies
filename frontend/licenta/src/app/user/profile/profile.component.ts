import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import {countries} from "../../utils/country-data-store";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  user = this.login.getUser();

  public countries:any = countries;

  editForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    confirmPassword:  new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')
    ]),
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
    city: '' ,
    confirmPassword: this.editForm.value.confirmPassword
  };

  constructor(
    private login: LoginService,
    private snack: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) { }

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
                                     console.log(this.user)
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
            this.router.navigate(['/profile']).then((_) => { });
        });
      },
      error: (error) => {
        this.snack.open(error.error.message, 'OK', {
          duration: 3000,
        });
      },
    });
  }
  selectedTab: string = 'aboutMe'; // Default tab

  selectTab(tabName: string) {
    this.selectedTab = tabName;
  }
}
