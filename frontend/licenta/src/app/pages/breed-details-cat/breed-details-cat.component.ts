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
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;


  user = this.login.getUser();
  breeds: any = [];
  totalElements: number = 0;
  public countries: any = countries;


  constructor(private login: LoginService, private router: Router, private snack: MatSnackBar, private breedDetailsService: Breed_detailsService) {
  }

  ngOnInit(): void {

    this.user = this.login.getUser();
    //this.getUniversities({page: "0", size: "5"});
    this.getAllBreeds();

    // @ts-ignore
    //this.dataSource.paginator = this.paginator;

  }

  public getUserRole() {
    return this.login.getUserRole();
  }

  // public goToReviews(university: any) {
  //   const user_role = this.login.getUserRole();
  //   if (user_role == 'ADMIN')
  //     this.router
  //       .navigate(['/admin/university-reviews', {universityId: university.id},])
  //       .then((_) => {
  //       }); else if (user_role == 'NORMAL') this.router
  //     .navigate(['/user-dashboard/university-reviews', {universityId: university.id},])
  //     .then((_) => {
  //     });
  // }


  private getAllBreeds() {
    this.breedDetailsService.getAllBreeds()
      .subscribe(data => {
        console.log(data)
        this.breeds = data;
      }, error => {
        console.log(error.error.message);
      });
  }
}
