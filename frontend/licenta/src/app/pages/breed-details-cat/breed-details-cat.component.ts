import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Breed_detailsService} from "../../services/breed_details.service";
import {countries} from "../../utils/country-data-store";

@Component({
  selector: 'app-breed-details-cat',
  templateUrl: './breed-details-cat.component.html',
  styleUrls: ['./breed-details-cat.component.css']
})
export class BreedDetailsCatComponent {
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  user = this.login.getUser();
  breeds: any = [];
  dogBreeds: any = [];
  totalElements: number = 134; // Presupun că acest număr ar trebui actualizat dinamic bazat pe date.

  constructor(private login: LoginService, private router: Router, private snack: MatSnackBar, private breedDetailsService: Breed_detailsService) {}

  ngOnInit(): void {
    this.user = this.login.getUser();
    // Calculează numărul paginii în care se află elementul cu ID 87
    let initialPage = Math.floor((87 - 1) / 15); // 86 pentru că paginile încep de la 0
    this.getAllBreeds(initialPage, 15);
  }

  getAllBreeds(page: number, size: number) {
    this.breedDetailsService.getAllBreeds({ page, size })
      .subscribe(data => {
        this.breeds = data.content;
        // @ts-ignore
        this.dogBreeds = this.breeds.filter(breed => breed.animalType === 'CAT');
        // Setează paginatorul la pagina corectă
        this.paginator.pageIndex = page;
      }, error => {
        console.log(error.error.message);
      });
  }

// Această metodă va fi apelată când pagina se schimbă
  handlePageEvent(event: any) {
    this.getAllBreeds(event.pageIndex, event.pageSize);
  }
}
