import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {AnimalService} from '../../services/animal.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AnimalCenterService} from 'src/app/services/animal-center.service';
import {FileModel} from "../../model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";
import {Review} from "../../model/review.model";
import Swal from "sweetalert2";
import {catBreeds, colorOptions, dogBreeds} from "../../utils/breeds-store";
import {Breed_detailsService} from "../../services/breed_details.service";

@Component({
  selector: 'app-review-add', templateUrl: './review-add.component.html', styleUrls: ['./review-add.component.css'],
})
export class ReviewAddComponent implements OnInit {
  user = this.login.getUser();
  universityId: any = undefined;
  university: any = undefined;

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
  review: Review = {
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
    university: undefined,
    author: undefined,
    breedDetails: undefined,
    reviewImages: []
  };

  breed: any = undefined;
  constructor(private login: LoginService, private snack: MatSnackBar, private router: Router, private route: ActivatedRoute,
              private reviewService: AnimalService, private universityService: AnimalCenterService, private sanitazer: DomSanitizer,
              private dogBreedService: Breed_detailsService) {
  }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.universityId = JSON.parse(this.route.snapshot.paramMap.get('universityId') || '{}');
    this.university = this.universityService
      .getAnimalCenter(this.universityId)
      .subscribe({
        next: (data) => {
          this.university = data;
        },
      });
  }

  isOtherSelected: boolean = false;

  checkOtherType(value: string): void {
    this.isOtherSelected = value === 'Others';
    if (!this.isOtherSelected) {
      this.petProfile.otherType = '';
    }
  }

  deleteImage(index: number): void {
    this.review.reviewImages.splice(index, 1);

    this.review.reviewImages = [...this.review.reviewImages];
  }

  formSubmit() {
    this.review.name = this.petProfile.inputName;
    this.review.color =  this.petProfile.inputColors.join(', ');
    this.review.size = this.petProfile.inputSize;
    this.review.gender = this.petProfile.inputGender;
    this.review.age = this.petProfile.inputAge;
    this.review.care = this.petProfile.inputCare.join(', ');
    this.review.health = this.petProfile.inputHealth;
    this.review.description = this.petProfile.inputDescription;
    this.review.coatLength = this.petProfile.inputCoatLength;
    this.review.goodInHome = this.petProfile.inputGoodInHome.join(', ')
    this.review.type = this.petProfile.inputType;

    const backedUpUserAuthorities = this.user.authorities;
    this.user.authorities = undefined;
    this.review.author = this.user;
    this.review.university = this.university;
    const backedUpAdminAuthorities = this.university.admin.authorities;
    this.university.admin.authorities = undefined;

    this.dogBreedService.getAllBreeds().subscribe({
      next: (data) => {
        // @ts-ignore
        this.breed = data.find(b => b.name === this.petProfile.inputBreed);
        this.review.breedDetails = this.breed;

        const reviewFormData = this.prepareFormData(this.review);

        this.reviewService.createAnimal(reviewFormData).subscribe({
          next: (data) => {
            this.user.authorities = backedUpUserAuthorities;
            this.university.admin.authorities = backedUpAdminAuthorities;
            Swal.fire({
              title: 'Success!',
              text: 'Animal added successfully',
              icon: 'success',
              background: 'rgb(230, 230, 230)',
            }).then((_) => {
              const user_role = this.login.getUserRole();
              if (user_role == 'ADMIN') this.router
                .navigate(['/admin/university-reviews/', {universityId: this.universityId},])
                .then((_) => {
                }); else if (user_role == 'NORMAL') this.router
                .navigate(['/user-dashboard/universities/', {universityId: this.universityId},])
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


  prepareFormData(review: any): FormData {
    const formData = new FormData();

    formData.append('review', new Blob([JSON.stringify(review)], {type: 'application/json'}));

    for (let i = 0; i < review.reviewImages.length; i++) {
      formData.append('imageFile', review.reviewImages[i].file, review.reviewImages[i].file.name);
    }

    return formData;
  }


  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandler: FileModel = {
        file: file, url: this.sanitazer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }
      this.review.reviewImages.push(fileHandler);
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
    this.review.reviewImages = [];
  }
}
