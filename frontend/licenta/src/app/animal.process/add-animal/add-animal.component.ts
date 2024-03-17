import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {AnimalService} from '../../services/animal.service.';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AnimalCenterService} from 'src/app/services/animal.center.service';
import {FileModel} from "../../model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
import {Animal} from "../../model/animal.model";
import Swal from "sweetalert2";
import {catBreeds, colorOptions, dogBreeds} from "../../utils/breeds-store";
import {Breed_detailsService} from "../../services/breed_details.service";

@Component({
  selector: 'app-animal-add', templateUrl: './add-animal.component.html', styleUrls: ['./add-animal.component.css'],
})
export class AddAnimalComponent implements OnInit {
  user = this.login.getUser();
  animalCenterId: any = undefined;
  animalCenter: any = undefined;
  colorOptions = colorOptions;

  petProfile: any = {
    inputName: undefined,
    inputAge: undefined,
    inputGender: undefined,
    inputSize: undefined,
    inputCoatLength: undefined,
    inputGoodInHome: undefined,
    inputType: undefined,
    inputBreed: undefined,
    inputHealth: undefined,
    inputCare: undefined,
    inputColors: [],
    inputDescription: undefined
  };

  // @ts-ignore
  animal: Animal = {
    name: '',
    health: undefined,
    description: undefined,
    type: undefined,
    color:undefined,
    care: undefined,
    goodInHome: undefined,
    coatLength: undefined,
    age: undefined,
    size: undefined,
    gender: undefined,
    animalCenter: undefined,
    author: undefined,
    breedDetails: undefined,
    animalImages: []
  };

  isOtherSelected: boolean = false;

  breed: any = undefined;
  constructor(private login: LoginService, private snack: MatSnackBar, private router: Router, private route: ActivatedRoute,
              private animalService: AnimalService, private animalCenterService: AnimalCenterService, private sanitazer: DomSanitizer,
              private dogBreedService: Breed_detailsService) {
  }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.animalCenterId = JSON.parse(this.route.snapshot.paramMap.get('universityId') || '{}');
    this.animalCenter = this.animalCenterService
      .getAnimalCenter(this.animalCenterId)
      .subscribe({
        next: (data) => {
          this.animalCenter = data;
        },
      });
  }


  checkOtherType(value: string): void {
    this.isOtherSelected = value === 'Others';
    if (!this.isOtherSelected) {
      this.petProfile.otherType = '';
    }
  }

  deleteImage(index: number): void {
    this.animal.animalImages.splice(index, 1);

    this.animal.animalImages = [...this.animal.animalImages];
  }

  formSubmit() {
    this.animal.name = this.petProfile.inputName;
    this.animal.color =  this.petProfile.inputColors.join(', ');
    this.animal.size = this.petProfile.inputSize;
    this.animal.gender = this.petProfile.inputGender;
    this.animal.age = this.petProfile.inputAge;
    this.animal.care = this.petProfile.inputCare.join(', ');
    this.animal.health = this.petProfile.inputHealth;
    this.animal.description = this.petProfile.inputDescription;
    this.animal.coatLength = this.petProfile.inputCoatLength;
    this.animal.goodInHome = this.petProfile.inputGoodInHome.join(', ')
    this.animal.type = this.petProfile.inputType;

    const backedUpUserAuthorities = this.user.authorities;
    this.user.authorities = undefined;
    this.animal.author = this.user;
    this.animal.animalCenter = this.animalCenter;
    const backedUpAdminAuthorities = this.animalCenter.admin.authorities;
    this.animalCenter.admin.authorities = undefined;

    this.dogBreedService.getAllBreeds().subscribe({
      next: (data) => {
        // @ts-ignore
        this.breed = data.find(b => b.name === this.petProfile.inputBreed);
        this.animal.breedDetails = this.breed;

        const animalFormData = this.prepareFormData(this.animal);

        this.animalService.createAnimal(animalFormData).subscribe({
          next: (data) => {
            this.user.authorities = backedUpUserAuthorities;
            this.animalCenter.admin.authorities = backedUpAdminAuthorities;
            Swal.fire({
              title: 'Success!',
              text: 'Animal added successfully',
              icon: 'success',
              background: 'rgb(230, 230, 230)',
            }).then((_) => {
              const user_role = this.login.getUserRole();
              if (user_role == 'ADMIN') this.router
                .navigate(['/admin/university-reviews/', {universityId: this.animalCenterId},])
                .then((_) => {
                }); else if (user_role == 'NORMAL') this.router
                .navigate(['/user-dashboard/universities/', {universityId: this.animalCenterId},])
                .then((_) => {
                });
            });

          },
          error: (error) => {
            this.snack.open(error.error.message, 'OK', {
              duration: 3000,
            });
          },
        });
      },
      error: (err) => {
        // Gestionează eroarea dacă cererea către dogBreedService eșuează
        console.error('Failed to load breeds', err);
      }
    });
  }

  getAgeOptions(animalType: string): string[] {
    if (animalType === 'Dog') {
      return ['Puppy', 'Young', 'Adult', 'Senior']; // Sunt doar exemple, pune valorile dorite
    } else if (animalType === 'Cat') {
      return ['Kitten', 'Young', 'Adult', 'Senior']; // Sunt doar exemple, pune valorile dorite
    }
    else return ['Young', 'Adult', 'Senior'];
  }

  getSizeOptions(animalType: string): string[] {
    if (animalType === 'Dog') {
      return ['Small (0-25 ibs)', 'Medium (26-60 ibs)', 'Large (61-100) ibs', 'Extra Large (101 ibs or more)']; // Sunt doar exemple, pune valorile dorite
    } else if (animalType === 'Cat') {
      return ['Small (0-6 ibs)', 'Medium (7-11 ibs)', 'Large (12-17) ibs', 'Extra Large (18 ibs or more)'];
    }
    return ['Small=', 'Medium', 'Large', 'Extra Large'];

  }

  // @ts-ignore
  getBreedOptions(animalType: string): string[] {
    if (animalType === 'Dog') {
      return dogBreeds;
    } else if (animalType === 'Cat') {
      return catBreeds;
    }
  }

  prepareFormData(animal: any): FormData {
    const formData = new FormData();

    formData.append('animal', new Blob([JSON.stringify(animal)], {type: 'application/json'}));

    for (let i = 0; i < animal.animalImages.length; i++) {
      formData.append('imageFile', animal.animalImages[i].file, animal.animalImages[i].file.name);
    }

    return formData;
  }


  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandler: FileModel = {
        file: file, url: this.sanitazer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }
      this.animal.animalImages.push(fileHandler);
    }
  }

  public isFormValid() {
    return this.petProfile.inputName;
  }

  clearForm() {
    this.petProfile.inputName = '';
    this.petProfile.inputAge = '';
    this.petProfile.inputSize = '';
    this.petProfile.inputGender = '';
    this.petProfile.inputCoatLength = '';
    this.petProfile.inputType = '';
    this.petProfile.inputColors = '';
    this.petProfile.inputCare = '';
    this.petProfile.inputDescription = '';
    this.petProfile.inputHealth = '';
    this.petProfile.inputBreed = '';
    this.petProfile.inputGoodInHome = '';
    this.animal.animalImages = [];
  }
}
