import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './register/signup/signup.component';
import { LoginComponent } from './register/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './user/profile/profile.component';
import { AnimalListComponent } from './animal.process/list-animal/animal-list.component';
import { AnimalCenterAddComponent } from './animal.process/add-center/animal-center-add.component';
import { AnimalCenterList } from './animal.process/list-center/animal-center-list.component';
import { AddAnimalComponent } from './animal.process/add-animal/add-animal.component';
import {AboutPetsComponent} from "./pages/about-pets/about-pets.component";
import {MissionComponent} from "./pages/mission/mission.component";
import {QuizComponent} from "./user/quiz/quiz.component";
import {BreedDetailsDogComponent} from "./pages/breed-details-dogs/breed-details-dog.component";
import {BreedDetailsCatComponent} from "./pages/breed-details-cat/breed-details-cat.component";
import {BreedDogComponent} from "./pages/breed-dog/breed-dog.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'about-pets',
    component: AboutPetsComponent,
    pathMatch: 'full',
  },
  {
    path: 'breed-details-dog',
    component: BreedDetailsDogComponent,
    pathMatch: 'full',
  },
  {
    path: 'breed-details-cat',
    component: BreedDetailsCatComponent,
    pathMatch: 'full',
  },
  {
    path: 'about-pets/mission',
    component: MissionComponent,
    pathMatch: 'full',
  },
  {
    path: 'breed-dog',
    component: BreedDogComponent,
    pathMatch: 'full',
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      {
        path: 'quiz',
        component: QuizComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'universities',
        component: AnimalCenterList,
      },
      {
        path: 'universities/add',
        component: AnimalCenterAddComponent,
      },
      {
        path: 'university-reviews',
        component: AnimalListComponent,
      },
      {
        path: 'university-reviews/add',
        component: AddAnimalComponent,
      },
      {
        path: 'my-reviews',
        component: AnimalListComponent,
      },
    ],
  },
  {
    path: 'user-dashboard',
    canActivate: [NormalGuard],
    children: [
      {
        path: 'quiz',
        component: QuizComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'universities',
        component: AnimalCenterList,
      },
      {
        path: 'university-reviews',
        component: AnimalListComponent,
      },
      {
        path: 'university-reviews/add',
        component: AddAnimalComponent,
      },
      {
        path: 'my-reviews',
        component: AnimalListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
