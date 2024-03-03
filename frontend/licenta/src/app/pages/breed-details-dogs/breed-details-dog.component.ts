import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Breed_detailsService } from "../../services/breed_details.service";

@Component({
  selector: 'app-breed-details',
  templateUrl: './breed-details-dog.component.html',
  styleUrls: ['./breed-details-dog.component.css']
})
export class BreedDetailsDogComponent implements OnInit {

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  user = this.login.getUser();
  breeds: any = [];
  dogBreeds: any = [];
  totalElements: number = 0;

  constructor(private login: LoginService, private router: Router, private snack: MatSnackBar, private breedDetailsService: Breed_detailsService) {}

  ngOnInit(): void {
    this.user = this.login.getUser();
    // Inițializare cu valori implicite pentru paginare
    this.getAllBreeds(0, 10); // Să presupunem că vrem 10 elemente pe pagină
  }

  getAllBreeds(page: number, size: number) {
    this.breedDetailsService.getAllBreeds({ page, size })
      .subscribe(data => {
        this.breeds = data.content; // Presupunând că răspunsul vine cu un array 'content'
        // @ts-ignore
        this.dogBreeds = this.breeds.filter(breed => breed.animalType === 'DOG');
        this.totalElements = data.totalElements; // Presupunând că răspunsul vine cu un total de elemente
      }, error => {
        console.log(error.error.message);
      });
  }

  // Această metodă va fi apelată când pagina se schimbă
  handlePageEvent(event: any) {
    this.getAllBreeds(event.pageIndex, event.pageSize);
  }
}
