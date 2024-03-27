import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {LoginService} from 'src/app/services/login.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.getLocation();
  }


  // @ts-ignore
  private user: { latitude: number; longitude: number};

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          if (position) {
            console.log("Latitude: " + position.coords.latitude +
              "Longitude: " + position.coords.longitude);
            this.user.latitude = position.coords.latitude;
            this.user.longitude = position.coords.longitude;
          }
        },
        (error) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  formSubmit() {
    this.login.generateToken(this.loginData.value).subscribe({
      next: (data: any) => {
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe({
          next: (user: any) => {
            this.login.setUser(user);
            // Navighează către pagina de home și apoi reîncarcă
            this.router.navigate(['']).then(() => {
              window.location.reload();
            });
          }
        });
      },
      error: (error) => {
        this.snack.open(error.error.message, 'OK', {
          duration: 3000,
        });
      }
    });
  }
}
