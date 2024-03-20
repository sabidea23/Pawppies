import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AnimalService} from '../../services/animal.service.';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {AnimalCenterService} from 'src/app/services/animal.center.service';
import {ImageProcessingService} from "../../services/image-processing.service";
import {EditAnimalComponent} from "../edit-animal/edit-animal.component";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(private login: LoginService, private dialog: MatDialog, private animalService: AnimalService, private router:
    Router, private route: ActivatedRoute, private snack: MatSnackBar, private animalCenterService: AnimalCenterService, private imageProcessingService: ImageProcessingService) {
  }

  getFavouriteAnimals() {
  if (this.animalCenterId) {
      this.animalService.getAnimalsByCenterId(this.animalCenterId).subscribe({
        next: (data) => {
          this.animals = data;
          this.getImagesForAnimals();
          console.log(this.animals)
        }, error: (_) => {
        },
      });
    } else if (this.userId) {
      this.animalService.getLikedAnimals(this.user.id).subscribe({
        next: (data) => {
          this.animals = data;
          console.log(this.animals)
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
     this.router
    .navigate(['/animal/add', {centerId: this.animalCenterId},])
    .then((_) => {
    });
  }

  public isLiked(animal: any) {
    return this.likedAnimals.some((r: any) => r.id === animal.id);
  }

  public likeAnimal(animal: any) {
    this.animalService.getLikeStatus(animal.id, this.user.id).subscribe({
      next: (updatedAnimal: any) => {
        // Update like count directly from the response
        animal.likes = updatedAnimal.likes;

        // Check if the animal is currently liked or not
        // @ts-ignore
        const isLiked = this.likedAnimals.some(a => a.id === animal.id);

        if (isLiked) {
          // If it was liked, remove it from the likedAnimals list
          // @ts-ignore
          this.likedAnimals = this.likedAnimals.filter(a => a.id !== animal.id);

          // If on the 'my-fav-animals' page, remove the animal from the main list as well
          if (this.router.url.includes('my-fav-animals')) {
            // @ts-ignore
            this.animals = this.animals.filter(a => a.id !== animal.id);
          }
        } else {
          // If it was not liked, add it to the likedAnimals list
          this.likedAnimals.push(animal);
        }
      },
      error: (error) => {
        this.snack.open(error.error.message, 'OK', {
          duration: 3000,
        });
      },
    });
  }

  public editAnimal(animal: any) {

    const dialogRef = this.dialog.open(EditAnimalComponent, {
      width: '600px', maxHeight: '800px', data: animal
    });

    // @ts-ignore
    dialogRef.afterClosed().subscribe(updatedData => {
      let modify = false;
      if (updatedData) {

        if ((animal.name != updatedData.name) || (animal.age != updatedData.age) || (animal.size != updatedData.size) ||
          (animal.coatLength != updatedData.coatLength) || (animal.health != animal.health) || (animal.care != animal.care)
          || (animal.description != animal.description)) {
          modify = true;
        }
        animal.name = updatedData.name;
        animal.age = updatedData.age;
        animal.size = updatedData.size;
        animal.coatLength = updatedData.coatLength;
        animal.health = updatedData.health;
        animal.care = updatedData.care;
        animal.description = updatedData.description;
        animal.animalImages = updatedData.animalImages;
        const backedUpAuthorities = animal.admin.authorities;
        animal.admin.authorities = undefined;
        this.animalService.updateAnimal(animal.id, animal, animal.animalImages).subscribe({
          next: (data: any) => {
            this.getFavouriteAnimals();
            animal.admin.authorities = backedUpAuthorities;

            animal = animal.map((u: any) => {
              if (u.id === animal.id) {
                u = animal;
              }
              return u;
            });

            if (modify) {
              Swal.fire({
                title: 'Edited!',
                text: 'Your animal center has been edited.',
                icon: 'success',
                background: '#fff',
                customClass: {
                  confirmButton: 'confirm-button-class',
                },
                confirmButtonText: 'OK',
                confirmButtonColor: '#6504B5',
              });
            }
          }, error: (error: any) => {
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
