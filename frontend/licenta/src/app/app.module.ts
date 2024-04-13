import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {NavbarComponent} from './pages/administration/navbar/navbar.component';
import {FooterComponent} from './pages/administration/footer/footer.component';

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
import {HomeComponent} from './pages/administration/home/home.component';
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
import {AboutPetsComponent} from './pages/administration/about-pets/about-pets.component';
import {MissionComponent} from './pages/administration/mission/mission.component';
import { QuizComponent } from './user/quiz/quiz.component';
import { BreedDetailsDogComponent } from './pages/breeds/breed-details-dogs/breed-details-dog.component';
import { BreedDetailsCatComponent } from './pages/breeds/breed-details-cat/breed-details-cat.component';
import { BreedDogComponent } from './pages/breeds/breed-dog/breed-dog.component';
import { EditAnimalComponent } from './animal.process/edit-animal/edit-animal.component';
import { UserManagementComponent } from './user/user-management/user-management.component';
import { CenterDetailsComponent } from './animal.process/center-details/center-details.component';
import { AnimalDetailsComponent } from './animal.process/animal-details/animal-details.component';
import { CutestDogsComponent } from './pages/adopt-dog/cutest-dogs/cutest-dogs.component';
import { ApartamnetsDogsComponent } from './pages/adopt-dog/apartamnets-dogs/apartamnets-dogs.component';
import { KidsDogsComponent } from './pages/adopt-dog/kids-dogs/kids-dogs.component';
import { PopularDogsComponent } from './pages/adopt-dog/popular-dogs/popular-dogs.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { BreedCatComponent } from './pages/breeds/breed-cat/breed-cat.component';
import { ContactComponent } from './pages/administration/contact/contact.component';
import { PolicyComponent } from './pages/administration/policy/policy.component';
import { FaqsComponent } from './pages/administration/faqs/faqs.component';
import { PrivacyPolicyComponent } from './pages/administration/privacy-policy/privacy-policy.component';
import { TermsServiceComponent } from './pages/administration/terms-service/terms-service.component';
import { FeedCatComponent } from './pages/adopt-cat/information/feed-cat/feed-cat.component';
import { FeedDogComponent } from './pages/adopt-dog/infomration/feed-dog/feed-dog.component';
import { AboutDogsComponent } from './pages/adopt-dog/infomration/about-dogs/about-dogs.component';
import { AboutCatComponent } from './pages/adopt-cat/information/about-cat/about-cat.component';
import { CatHealthComponent } from './pages/adopt-cat/information/cat-health/cat-health.component';
import { DogHealthComponent } from './pages/adopt-dog/infomration/dog-health/dog-health.component';
import { DogTrainingComponent } from './pages/adopt-dog/infomration/dog-training/dog-training.component';
import { CatBehaviorComponent } from './pages/adopt-cat/information/cat-behavior/cat-behavior.component';
import { CuteCaatComponent } from './pages/adopt-cat/cute-caat/cute-caat.component';
import { FluffyCatComponent } from './pages/adopt-cat/fluffy-cat/fluffy-cat.component';
import { HairlessCatComponent } from './pages/adopt-cat/hairless-cat/hairless-cat.component';
import { BestCatKidsComponent } from './pages/adopt-cat/best-cat-kids/best-cat-kids.component';
import {MatBadgeModule} from "@angular/material/badge";
import { AdoptionRequestComponent } from './animal.process/adoption-request/adoption-request.component';
import { RequestsManagementComponent } from './user/requests-management/requests-management.component';
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [AppComponent, NavbarComponent, FooterComponent, SignupComponent, LoginComponent, HomeComponent, ProfileComponent, AddAnimalComponent, AnimalListComponent, AnimalCenterAddComponent, AnimalCenterList, MapDialogComponent, EditAnimalCenterComponent, AboutPetsComponent, MissionComponent, QuizComponent, BreedDetailsDogComponent, BreedDetailsCatComponent, BreedDogComponent, EditAnimalComponent, UserManagementComponent, CenterDetailsComponent, AnimalDetailsComponent, CutestDogsComponent, ApartamnetsDogsComponent, KidsDogsComponent, PopularDogsComponent, BreedCatComponent, ContactComponent, PolicyComponent, FaqsComponent, PrivacyPolicyComponent, TermsServiceComponent, FeedCatComponent, FeedDogComponent, AboutDogsComponent, AboutCatComponent, CatHealthComponent, DogHealthComponent, DogTrainingComponent, CatBehaviorComponent, CuteCaatComponent, FluffyCatComponent, HairlessCatComponent, BestCatKidsComponent, AdoptionRequestComponent, RequestsManagementComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, FormsModule, HttpClientModule, MatSnackBarModule, MatCardModule, MatChipsModule, MatToolbarModule, MatIconModule, MatListModule, MatTableModule, ReactiveFormsModule, RouterOutlet, MatGridListModule, MatDialogModule, MatMenuModule, MatPaginatorModule, MatSelectModule, MatCheckboxModule, MatBadgeModule, MatSortModule],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {
}
