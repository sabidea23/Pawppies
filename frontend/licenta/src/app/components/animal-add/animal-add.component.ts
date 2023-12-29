import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AnimalService} from "../../services/animal.service";
import {AnimalCenterService} from "../../services/animal-center.service";

@Component({
  selector: 'app-animal-add', templateUrl: './animal-add.component.html', styleUrls: ['./animal-add.component.css'],
})
export class AnimalAddComponent implements OnInit {
  user = this.login.getUser();
  animalCenterId: any;
  animalCenter: any = undefined;

  inputText: string = '';

  public animal: any = {
    animalCenter: undefined, author: undefined,
  };

  constructor(private login: LoginService, private snack: MatSnackBar, private router: Router, private route: ActivatedRoute, private animalService: AnimalService, private animalCenterService: AnimalCenterService,) {
  }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.animalCenterId = JSON.parse(this.route.snapshot.paramMap.get('animalCenterId') || '{}');
    this.animalCenter = this.animalCenterService
      .getAnimalCenterById(this.animalCenterId)
      .subscribe({
        next: (data) => {
          this.animalCenter = data;
        },
      });
  }

  formSubmit() {
    this.animal['text'] = this.inputText;

    const backedUpUserAuthorities = this.user.authorities;
    this.user.authorities = undefined;

    this.animal.author = this.user;
    this.animal.animalCenter = this.animalCenter;

    const backedUpAdminAuthorities = this.animalCenter.admin.authorities;
    this.animalCenter.admin.authorities = undefined;

    this.animalService.addAnimal(this.animal).subscribe({
      next: (data) => {
        this.user.authorities = backedUpUserAuthorities;
        this.animalCenter.admin.authorities = backedUpAdminAuthorities;

        this.snack.open('animal added successfully', 'OK', {
          duration: 3000,
        });

        this.router.navigate(['/']); // Redirect to the homepage or another appropriate page
      }, error: (error) => {
        this.snack.open(error.error.message, 'OK', {
          duration: 3000,
        });
      },
    });
  }
}
