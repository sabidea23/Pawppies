import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {LoginService} from 'src/app/services/login.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    username: '', password: '',
  };

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
    if (this.loginData.username.trim() == '' || this.loginData.username == null) {
      this.snack.open("Username is required!", "", {duration: 3000});
      return;
    }

    if (this.loginData.password.trim() == '' || this.loginData.password == null) {
      this.snack.open("Password is required!", "", {duration: 3000});
      return;
    }

    this.login.generateToken(this.loginData).subscribe({
      next: (data: any) => {
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe({
          next: (user: any) => {
            this.login.setUser(user);
            // Navighează către pagina de home și apoi reîncarcă
            this.router.navigate(['']).then(() => {
              window.location.reload();
            });
            // Asigură-te că redirecționarea se face aici, după ce utilizatorul este setat
          }
        });
      },
      error: (error) => {
        this.snack.open("Invalid credentials!", "", {duration: 3000});
      }
    });
  }
}
