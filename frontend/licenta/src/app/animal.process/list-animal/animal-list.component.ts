import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AnimalService} from '../../services/animal.service.';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {AnimalCenterService} from 'src/app/services/animal.center.service';
import {ImageProcessingService} from "../../services/image-processing.service";

@Component({
  selector: 'app-animal-list', templateUrl: './animal-list.component.html', styleUrls: ['./animal-list.component.css'],
})
export class AnimalListComponent implements OnInit {
  animalCenter: any = undefined;
  user = this.login.getUser();
  animals: any = [];
  animalCenterId: any;
  userId: any;
  likedAnimals: any = [];

  constructor(private login: LoginService, private animalService: AnimalService, private router: Router, private route: ActivatedRoute, private snack: MatSnackBar, private animalCenterService: AnimalCenterService, private imageProcessingService: ImageProcessingService) {
  }

  getFavouriteAnimals() {
    if (this.animalCenterId && this.userId) {
      this.animalService
        .getAnimalsByCenterIdAndAuthorId(this.animalCenterId, this.userId)
        .subscribe({
          next: (data) => {
            this.animals = data;
            this.getImagesForAnimals();
          }, error: (_) => {
          },
        });
    } else if (this.animalCenterId) {
      this.animalService.getAnimalsByCenterId(this.animalCenterId).subscribe({
        next: (data) => {
          this.animals = data;
          this.getImagesForAnimals();
        }, error: (_) => {
        },
      });
    } else if (this.userId) {
      this.animalService.getLikedAnimals(this.user.id).subscribe({
        next: (data) => {
          this.animals = data;
          this.getImagesForAnimals();
        },
      });
    } else {
      this.animalService.getAnimals().subscribe({
        next: (data) => {
          this.animals = data;
          this.getImagesForAnimals();
        }, error: (_) => {
        },
      });
    }
  }

  getImagesForAnimals() {
    for (let i = 0; i < this.animals.length; i++) {
      this.animals[i] = this.imageProcessingService.createImage(this.animals[i]);
    }
  }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.animalCenterId = JSON.parse(this.route.snapshot.paramMap.get('centerId') || 'null') || undefined;

    this.userId = JSON.parse(this.route.snapshot.paramMap.get('userId') || 'null') || undefined;

    this.animalCenter = this.animalCenterId ? this.animalCenterService.getAnimalCenter(this.animalCenterId).subscribe({
      next: (data) => {
        this.animalCenter = data;
      },
    }) : undefined;

    this.getFavouriteAnimals();

    this.animalService.getLikedAnimals(this.user.id).subscribe({
      next: (data) => {
        this.likedAnimals = data;
      },
    });
  }

  public getUserRole() {
    return this.login.getUserRole();
  }

  public goToAddAnimal() {
    const user_role = this.login.getUserRole();
    if (user_role == 'ADMIN') this.router
      .navigate(['/admin/university-reviews/add', {universityId: this.animalCenterId},])
      .then((_) => {
      }); else if (user_role == 'NORMAL') this.router
      .navigate(['/user-dashboard/university-reviews/add', {universityId: this.animalCenterId},])
      .then((_) => {
      });
  }

  public isLiked(animal: any) {
    return this.likedAnimals.some((r: any) => r.id === animal.id);
  }

  public likeAnimal(animal: any) {
    this.animalService.getLikeStatus(animal.id, this.user.id).subscribe({
      next: (updatedAnimal: any) => {
        this.animalService.getLikedAnimals(this.user.id).subscribe({
          next: (data) => {
            this.likedAnimals = data;
          },
        });

        animal.likes = updatedAnimal.likes;
      }, error: (error) => {
        this.snack.open(error.error.message, 'OK', {
          duration: 3000,
        });
      },
    });
  }


  public editAnimal(animal: any) {
    Swal.fire({
      width: '800px', title: 'Edit Animal Description', background: 'rgb(230, 230, 230)', html: `
      <textarea
        id="swal-input"
        class="swal2-input"
        style="width: 90%; height: 275px; font-size: 16px;"
        placeholder="Text">
        ${animal.text.trim()}
      </textarea>
      `, focusConfirm: false, preConfirm: () => {
        const text = (document.getElementById('swal-input') as HTMLInputElement).value.trim();
        return {text};
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        animal.text = result.value.text;

        this.animalService.updateAnimal(animal).subscribe({
          next: (_) => {
            this.animals = this.animals.map((r: any) => {
              if (r.id === animal.id) {
                r = animal;
              }
              return r;
            });
            Swal.fire({
              title: 'Edited!', text: 'The animal has been edited', icon: 'success', background: 'rgb(230, 230, 230)',
            }).then(() => {
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

  public deleteAnimal(animal: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this animal!',
      icon: 'warning',
      background: 'rgb(230, 230, 230)',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it.',
    }).then((result) => {
      if (result.isConfirmed) {
        this.animalService.deleteAnimal(animal.id).subscribe({
          next: (_) => {
            this.animals = this.animals.filter((r: any) => r.id !== animal.id);
            Swal.fire({
              title: 'Deleted!',
              text: 'The animal has been deleted.',
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
}
