import { Component } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AnimalCenterService} from "../../services/animal.center.service";

@Component({
  selector: 'app-center-details',
  templateUrl: './center-details.component.html',
  styleUrls: ['./center-details.component.css']
})
export class CenterDetailsComponent {

  constructor( private route: ActivatedRoute,
               private login: LoginService, private router: Router, private snack: MatSnackBar,
              private animalCenterService: AnimalCenterService) {
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
}
