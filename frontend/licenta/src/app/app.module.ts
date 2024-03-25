import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {NavbarComponent} from './pages/navbar/navbar.component';
import {FooterComponent} from './pages/footer/footer.component';

import {SignupComponent} from './register/signup/signup.component';
import {LoginComponent} from './register/login/login.component';

import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {BrowserModule} from '@angular/platform-browser';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HomeComponent} from './pages/home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import {authInterceptorProviders} from './services/auth.interceptor';
import {ProfileComponent} from './user/profile/profile.component';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {AnimalCenterAddComponent} from './animal.process/add-center/animal-center-add.component';
import {AnimalCenterList} from './animal.process/list-center/animal-center-list.component';
import {AnimalListComponent} from './animal.process/list-animal/animal-list.component';
import {AddAnimalComponent} from './animal.process/add-animal/add-animal.component';
import {RouterOutlet} from '@angular/router';
import {MatGridListModule} from "@angular/material/grid-list";
import {MapDialogComponent} from './utils/map-dialog/map-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {EditAnimalCenterComponent} from './animal.process/edit-center/edit-animal-center.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {AboutPetsComponent} from './pages/about-pets/about-pets.component';
import {MissionComponent} from './pages/mission/mission.component';
import { QuizComponent } from './user/quiz/quiz.component';
import { BreedDetailsDogComponent } from './pages/breed-details-dogs/breed-details-dog.component';
import { BreedDetailsCatComponent } from './pages/breed-details-cat/breed-details-cat.component';
import { BreedDogComponent } from './pages/breed-dog/breed-dog.component';
import { EditAnimalComponent } from './animal.process/edit-animal/edit-animal.component';
import { UserManagementComponent } from './user/user-management/user-management.component';
import { CenterDetailsComponent } from './animal.process/center-details/center-details.component';
import { AnimalDetailsComponent } from './animal.process/animal-details/animal-details.component';
import { CutestDogsComponent } from './pages/cutest-dogs/cutest-dogs.component';
import { ApartamnetsDogsComponent } from './pages/apartamnets-dogs/apartamnets-dogs.component';
import { KidsDogsComponent } from './pages/kids-dogs/kids-dogs.component';
import { PopularDogsComponent } from './pages/popular-dogs/popular-dogs.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent, SignupComponent, LoginComponent, HomeComponent, ProfileComponent, AddAnimalComponent, AnimalListComponent, AnimalCenterAddComponent, AnimalCenterList, MapDialogComponent, EditAnimalCenterComponent, AboutPetsComponent, MissionComponent, QuizComponent, BreedDetailsDogComponent, BreedDetailsCatComponent, BreedDogComponent, EditAnimalComponent, UserManagementComponent, CenterDetailsComponent, AnimalDetailsComponent, CutestDogsComponent, ApartamnetsDogsComponent, KidsDogsComponent, PopularDogsComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, FormsModule, HttpClientModule, MatSnackBarModule, MatCardModule, MatChipsModule, MatToolbarModule, MatIconModule, MatListModule, MatTableModule, ReactiveFormsModule, RouterOutlet, MatGridListModule, MatDialogModule, MatMenuModule, MatPaginatorModule, MatSelectModule],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {
}
