import { Component } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AnimalCenterService} from "../../services/animal.center.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-center-details',
  templateUrl: './center-details.component.html',
  styleUrls: ['./center-details.component.css']
})
export class CenterDetailsComponent {

  constructor( private route: ActivatedRoute,
               private login: LoginService, private router: Router, private snack: MatSnackBar,
              private animalCenterService: AnimalCenterService,
               private sanitizer: DomSanitizer) {
  }

  animalCenterId:any;
  animalCenter:any;
  user = this.login.getUser();
  ngOnInit(): void {
    this.user = this.login.getUser();
    this.animalCenterId = JSON.parse(this.route.snapshot.paramMap.get('centerId') || '{}');
    this.animalCenter = this.animalCenterService
      .getAnimalCenter(this.animalCenterId)
      .subscribe({
        next: (data) => {
          this.animalCenter = data;
          console.log(data);
        },
      });
  }

  showDirections() {
    if (this.user == null) {
      this.router
        .navigate(['/login', {centerId: this.animalCenterId},]);
    }
    const destinationLatitude = this.animalCenter.latitude;
    const destinationLongitude = this.animalCenter.longitude;

    const userLatitude = this.user.latitude;
    const userLongitude = this.user.longitude;

    const directionUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&travelmode=driving`;

    window.open(directionUrl, "_blank");
  }


  getSafeUrl() {
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${this.animalCenter.longitude - 0.005},${this.animalCenter.latitude - 0.005},${this.animalCenter.longitude + 0.005},${this.animalCenter.latitude + 0.005}&layer=mapnik&marker=${this.animalCenter.latitude},${this.animalCenter.longitude}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public goToAnimalsPage(animalCenter: any) {
    this.router
      .navigate(['/animal', {centerId: animalCenter.id},])
      .then((_) => {
      });
  }
}
