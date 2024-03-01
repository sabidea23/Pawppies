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

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  user = this.login.getUser();
  breeds: any = [];
  dogBreeds: any = [];
  totalElements: number = 0;

  constructor(private login: LoginService, private router: Router, private snack: MatSnackBar, private breedDetailsService: Breed_detailsService) {}

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.getAllBreeds();
  }

  private getAllBreeds() {
    // @ts-ignore
    this.breedDetailsService.getAllBreeds()
      .subscribe(data => {
        this.breeds = data;
        // Filtrarea pentru a păstra doar rasele de câini
        this.dogBreeds = this.breeds.filter((breed: any) => breed.animalType === 'DOG');
        this.totalElements = this.dogBreeds.length;
        console.log(this.dogBreeds);
        console.log(this.totalElements);

      }, error => {
        console.log(error.error.message);
      });
  }
}
