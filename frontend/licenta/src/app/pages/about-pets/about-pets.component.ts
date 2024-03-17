import { Component } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {SearchService} from "../../services/search.service";
import {countries} from "../../utils/country-data-store";

@Component({
  selector: 'app-about-pets',
  templateUrl: './about-pets.component.html',
  styleUrls: ['./about-pets.component.css']
})
export class AboutPetsComponent {

  searchData = {
    city: '',
    country: '',
    name: '',
    distance: ''
  };

  public countries: any = countries;

  constructor(private login: LoginService, private router: Router, private searchService: SearchService) {
  }
  goToPawppiesMission() {
    this.router
      .navigate(['/about-pets/mission'])
      .then((_) => {
      });
  }

  goToQuizPage() {
    const user_role = this.login.getUserRole();
    if (user_role == 'ADMIN') this.router
      .navigate(['/quiz/'])
      .then((_) => {
      }); else if (user_role == 'NORMAL') this.router
      .navigate(['/quiz/'])
      .then((_) => {
      });
  }

  performSearch() {
    // Setează filtrele de căutare în serviciu
    this.searchService.setSearchFilters(this.searchData);
    const user_role = this.login.getUserRole();
    if (user_role == 'ADMIN') this.router
      .navigate(['/centers/'])
      .then((_) => {
      }); else if (user_role == 'NORMAL') this.router
      .navigate(['/centers/'])
      .then((_) => {
      });
  }
}
