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
import {catBreeds, dogBreedsName, colorOptions} from "../../utils/breeds-store";

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
    Router, private route: ActivatedRoute, private snack: MatSnackBar, private animalCenterService: AnimalCenterService,
              private imageProcessingService: ImageProcessingService) {
  }

  getFavouriteAnimals() {
  if (this.animalCenterId) {
      this.animalService.getAnimalsByCenterId(this.animalCenterId).subscribe({
        next: (data) => {
          this.animals = data;
          console.log(data)
          this.getImagesForAnimals();
          this.filterBreeds();
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
          this.filterBreeds();
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
    this.getAllCentersNames();
  }

  public getUserRole() {
    return this.login.getUserRole();
  }

  public goToAddAnimal() {
     this.router
    .navigate(['supplier/animal/add', {centerId: this.animalCenterId},])
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
        const backedUpAuthorities = animal.author.authorities;
        const  backUpAuthoritiesCenter = animal.animalCenter.admin.authorities;
        animal.animalCenter.admin.authorities = undefined;
        animal.author.authorities = undefined;
        this.animalService.updateAnimal(animal.id, animal, animal.animalImages).subscribe({
          next: (data: any) => {
            this.getFavouriteAnimals();
            animal.author.authorities = backedUpAuthorities;
            animal.animalCenter.admin.authorities = backUpAuthoritiesCenter;
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

  //filtrare
  filters: any = {
    type: [],
    age: [],
    size: [],
    gender: [],
    care: [],
    coatLength: []
  };

  animalFiltered: any = [];
  pressedButton: { [key: string]: boolean } = {};


  toggleButton(key: string) {
    this.pressedButton[key] = !this.pressedButton[key];
  }

  applyFilter(category: string, value: string): void {
  //  this.currentPage = 1;

    if (category === 'type') {
      if (value === 'Dog') {
        this.animalBreeds = dogBreedsName;
      } else if (value === 'Cat') {
        this.animalBreeds = catBreeds;
      }
    }

    if (this.filters[category].includes(value)) {
      // @ts-ignore
      this.filters[category] = this.filters[category].filter(item => item !== value);
    } else {
      this.filters[category].push(value);
    }
    this.filterBreeds();
  }

  filterBreeds(): void {
    // @ts-ignore
    this.animalFiltered = this.animals.filter(animal => {
      return this.getAnimalsByType(animal) && this.getAnimalAge(animal) && this.getAnimalSize(animal) && this.getAnimalGender(animal)
        && this.getCare(animal) && this.getCoatLength(animal) && this.filterByName(animal) && this.filterAnimalsByBreed(animal) &&
        this.filterAnimalsByColor(animal) && this.filterAnimalsByCenter(animal)});
  }

  getCoatLength(animal:any):boolean {
    let coatLength = '';
    if (animal.coatLength == 'Hairless')
      coatLength = 'Hairless'
    else if (animal.coatLength == 'Short')
      coatLength = 'Short'
    else if (animal.coatLength == 'Medium')
      coatLength = 'Medium'
    else if (animal.coatLength == 'Long')
      coatLength = 'Long'
    return !(this.filters.coatLength && this.filters.coatLength.length > 0 && !this.filters.coatLength.includes(coatLength));
  }

  getCare(animal: any):boolean {
    let care = '';
    if (animal.care.includes('Special Needs'))
      care = 'Special Needs'
    else  if (animal.care.includes('House trained'))
      care = 'House trained'
    return !(this.filters.care && this.filters.care.length > 0 && !this.filters.care.includes(care));
  }

  getAnimalSize(animal:any): boolean {
    let size = '';
    if (animal.size.startsWith('Small'))
      size = 'Small'
    else if (animal.size.startsWith('Medium'))
      size = 'Medium'
    else if (animal.size.startsWith('Large'))
      size = 'Large'
    else
      size = 'Extra Large'

    return !(this.filters.size && this.filters.size.length > 0 && !this.filters.size.includes(size));
  }

  getAnimalsByType(animal: any): boolean {
    let type ='';
    if (animal.type == 'Dog'){
      type = 'Dog';
    } else  if (animal.type == 'Cat') {
      type = 'Cat';
    }
      return !(this.filters.type && this.filters.type.length > 0 && !this.filters.type.includes(type));
  }

  getAnimalAge(animal: any):boolean {
    let age = '';
    if (animal.age == "Kitten" || animal.age == 'Puppy')
      age = 'Puppy/Kitten';
    else if (animal.age == "Young")
      age = 'Young';
    else if (animal.age == 'Senior')
      age = 'Senior';
    else
      age = 'Adult' ;

    return !(this.filters.age && this.filters.age.length > 0 && !this.filters.age.includes(age));
  }

  getAnimalGender(animal:any):boolean {
    let gender = '';
    if (animal.gender == 'Male')
      gender = 'Male'
    else
      gender = 'Female'
    return !(this.filters.gender && this.filters.gender.length > 0 && !this.filters.gender.includes(gender));
  }

  searchTerms: string[] = [];
  searchTerm: string = '';

  addSearchTerm(term: string): void {
    if (term && !this.searchTerms.includes(term)) {
      this.searchTerms.push(term);
      this.filterBreeds();
    }
    this.searchTerm = '';
  }

  removeSearchTerm(term: string): void {
    this.searchTerms = this.searchTerms.filter(t => t !== term);
    this.filterBreeds();
  }

  filterByName(animal: any): boolean {
    return this.searchTerms.length ? this.searchTerms.some(name => animal.name.toLowerCase().includes(name.toLowerCase())) : true;
  }

  // @ts-ignore
  animalBreeds:  string[];
  showBreedOptions = false;
  selectedBreeds: string[] = [];
  breedSearchTerm: string = '';

  addBreed(breed: string): void {
    if (!this.selectedBreeds.includes(breed)) {
      this.selectedBreeds.push(breed);
      this.filterBreeds();
    }
    this.showBreedOptions = false;
  }

  removeBreed(breed: string): void {
    this.selectedBreeds = this.selectedBreeds.filter(b => b !== breed);
    this.filterBreeds();
  }

  hideBreedOptions(): void {
    setTimeout(() => {
      this.showBreedOptions = false;
    }, 200);
  }

  filterAnimalsByBreed(animal: any): boolean {
    return this.selectedBreeds.length ? this.selectedBreeds.some(name => animal.breedDetails.name.toLowerCase().includes(name.toLowerCase())) : true;
  }

  colorOptions: string[] = colorOptions;  // Lista de culori
  showColorOptions: boolean = false;
  selectedColors: string[] = [];
  colorSearchTerm: string = '';

  addColor(color: string): void {
    if (!this.selectedColors.includes(color)) {
      this.selectedColors.push(color);
      this.filterBreeds();
    }
    this.showColorOptions = false;
  }

  removeColor(color: string): void {
    this.selectedColors = this.selectedColors.filter(c => c !== color);
    this.filterBreeds();
  }

  hideColorOptions(): void {
    setTimeout(() => {
      this.showColorOptions = false;
    }, 200);
  }

  // @ts-ignore
  filterAnimalsByColor(animal): boolean {
    return this.selectedColors.length ? this.selectedColors.some(color =>
      animal.color.toLowerCase().includes(color.toLowerCase())) : true;
  }

  getAllCentersNames() {
    this.animalCenterService
      .getAnimalCentersName()
      .subscribe({
        next: (data) => {
          this.centerNames = data;
          console.log(data);
        },
      });
  }

  centerNames: any = [];
  showCenterOptions: boolean = false;
  selectedCenters: string[] = [];
  centerSearchTerm: string = '';

  addCenter(center: string): void {
    if (!this.selectedCenters.includes(center)) {
      this.selectedCenters.push(center);
      this.filterBreeds();
    }
    this.showCenterOptions = false;
  }

  removeCenter(center: string): void {
    this.selectedCenters = this.selectedCenters.filter(c => c !== center);
    this.filterBreeds();
  }

  hideCenterOptions(): void {
    setTimeout(() => {
      this.showCenterOptions = false;
    }, 200);
  }

  filterAnimalsByCenter(animal :any): boolean {
    return this.selectedCenters.length ? this.selectedCenters.some(center =>
      animal.animalCenter.name.toLowerCase().includes(center.toLowerCase())) : true;
  }
}
