import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../../../services/login.service';
import {AnimalCenterService} from '../../../services/animal-center.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-animal-center-add',
  templateUrl: './animal-center-add.component.html',
  styleUrls: ['./animal-center-add.component.css'],
})
export class AnimalCenterAddComponent implements OnInit {
  user = this.login.getUser();
  animalCenters: any = [];

  public animalCenter: any = {
    name: '', description: '', location: '', admin: undefined,
  };

  public formInput: any = {
    name: '', location: '', description: ''
  };

  constructor(private login: LoginService, private snack: MatSnackBar, private router: Router, private animalCenterService: AnimalCenterService,) {
  }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.animalCenterService.getAllAnimalCentera().subscribe({
      next: (data: any) => {
        this.animalCenters = data;
      },
    });
  }

  public isFormValid() {
    return this.formInput.name && this.formInput.location && this.formInput.description;
  }

  formSubmit() {
    for (const key in this.formInput) {
      this.animalCenter[key] = this.formInput[key];
    }

    const backedUpAuthorities = this.user.authorities;
    this.user.authorities = undefined;

    this.animalCenter.admin = this.user;

    this.animalCenterService.addAnimalCenter(this.animalCenter).subscribe({
      next: (data) => {
        // Restore authorities, maybe it will be needed later
        this.user.authorities = backedUpAuthorities;

        Swal.fire({
          title: 'Success!', text: 'animalCenter added successfully', icon: 'success', background: 'rgb(230, 230, 230)',
        }).then((_) => {
          this.router.navigate(['/admin/animal-centers']).then((_) => {
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
