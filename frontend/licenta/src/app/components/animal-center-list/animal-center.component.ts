import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {AnimalCenterService} from '../../services/animal-center.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import FuzzySearch from 'fuzzy-search';

@Component({
  selector: 'app-animal-center',
  templateUrl: './animal-center.component.html',
  styleUrls: ['./animal-center.component.css'],
})
export class AnimalCenterComponent implements OnInit {
  user = this.login.getUser();
  animalCenters: any = [];
  filteredAnimalCenters: any = [];
  searchItem: string = '';

  constructor(private login: LoginService, private router: Router, private snack: MatSnackBar, private AnimalCenterService: AnimalCenterService) {
  }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.AnimalCenterService.getAllAnimalCentera().subscribe({
      next: (data) => {
        this.animalCenters = data;
        this.filteredAnimalCenters = data;
      },
    });
  }

  public getUserRole() {
    return this.login.getUserRole();
  }

  public goToAnimal(AnimalCenter: any) {
    const user_role = this.login.getUserRole();
    if (user_role == 'ADMIN') this.router
      .navigate(['/admin/animal-centers-animals', {animalCenterId: AnimalCenter.id},])
      .then((_) => {
      }); else if (user_role == 'NORMAL') this.router
      .navigate(['/user-dashboard/animal-centers-animals', {animalCenterId: AnimalCenter.id},])
      .then((_) => {
      });
  }

  public goToAddAnimalCenter() {
    this.router.navigate(['/admin/animal-centers/add']).then((_) => {
    });
  }

  public editAnimalCenter(AnimalCenter: any) {
    Swal.fire({
      title: 'Edit AnimalCenter',
      background: 'rgb(230, 230, 230)',
      html: `<input id="swal-input1" class="swal2-input" placeholder="Name" value="${AnimalCenter.name}">
      <input id="swal-input2" class="swal2-input" placeholder="Location" value="${AnimalCenter.location}">
      <textarea id="swal-input3" class="swal2-input" style="min-height: 200px" placeholder="Description">${AnimalCenter.description}`,
      focusConfirm: false,
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const location = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const description = (document.getElementById('swal-input3') as HTMLInputElement).value;

        if (!name || !location || !description) {
          Swal.showValidationMessage(`Please fill in all fields`);
        }

        return {name, location, description};
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        AnimalCenter.name = result.value.name;
        AnimalCenter.location = result.value.location;
        AnimalCenter.description = result.value.description;

        const backedUpAuthorities = AnimalCenter.admin.authorities;
        AnimalCenter.admin.authorities = undefined;

        this.AnimalCenterService.updateAnimalCenter(AnimalCenter).subscribe({
          next: (_) => {
            AnimalCenter.admin.authorities = backedUpAuthorities;

            this.animalCenters = this.animalCenters.map((u: any) => {
              if (u.id === AnimalCenter.id) {
                u = AnimalCenter;
              }
              return u;
            });
            Swal.fire({
              title: 'Edited!',
              text: 'Your AnimalCenter has been edited.',
              icon: 'success',
              background: 'rgb(230, 230, 230)',
            });
          }, error: (error) => {
            this.snack.open(error.error.message, 'OK', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  public deleteAnimalCenter(AnimalCenter: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this AnimalCenter!',
      icon: 'warning',
      background: 'rgb(230, 230, 230)',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it.',
    }).then((result) => {
      if (result.isConfirmed) {
        this.AnimalCenterService.deleteAnimalCenterById(AnimalCenter.id).subscribe({
          next: (_) => {
            this.animalCenters = this.animalCenters.filter((u: any) => u.id !== AnimalCenter.id);
            Swal.fire({
              title: 'Deleted!',
              text: 'Your AnimalCenter has been deleted.',
              icon: 'success',
              background: 'rgb(230, 230, 230)',
            }).then((_) => {
              window.location.reload();
            });
          }, error: (error) => {
            this.snack.open(error.error.message, 'OK', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  public searchAnimalCenter(searchItem: string) {
    this.filteredAnimalCenters = this.animalCenters;
    const searcher = new FuzzySearch(this.filteredAnimalCenters, ['name']);
    this.filteredAnimalCenters = searcher.search(searchItem);
  }
}
