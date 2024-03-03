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

}
