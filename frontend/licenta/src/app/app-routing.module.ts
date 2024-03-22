import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './register/signup/signup.component';
import {LoginComponent} from './register/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {ProfileComponent} from './user/profile/profile.component';
import {AnimalListComponent} from './animal.process/list-animal/animal-list.component';
import {AnimalCenterAddComponent} from './animal.process/add-center/animal-center-add.component';
import {AnimalCenterList} from './animal.process/list-center/animal-center-list.component';
import {AddAnimalComponent} from './animal.process/add-animal/add-animal.component';
import {AboutPetsComponent} from "./pages/about-pets/about-pets.component";
import {MissionComponent} from "./pages/mission/mission.component";
import {QuizComponent} from "./user/quiz/quiz.component";
import {BreedDetailsDogComponent} from "./pages/breed-details-dogs/breed-details-dog.component";
import {BreedDetailsCatComponent} from "./pages/breed-details-cat/breed-details-cat.component";
import {BreedDogComponent} from "./pages/breed-dog/breed-dog.component";
import {UserManagementComponent} from "./user-management/user-management.component";

const routes: Routes = [{
  path: '', component: HomeComponent, pathMatch: 'full',
}, {
  path: 'signup', component: SignupComponent, pathMatch: 'full',
}, {
  path: 'login', component: LoginComponent, pathMatch: 'full',
}, {
  path: 'about-pets', component: AboutPetsComponent, pathMatch: 'full',
}, {
  path: 'breed-details-dog', component: BreedDetailsDogComponent, pathMatch: 'full',
}, {
  path: 'breed-details-cat', component: BreedDetailsCatComponent, pathMatch: 'full',
}, {
  path: 'about-pets/mission', component: MissionComponent, pathMatch: 'full',
}, {
  path: 'breed-dog', component: BreedDogComponent, pathMatch: 'full',
}, {
  path: 'quiz', component: QuizComponent,
}, {
  path: 'profile', component: ProfileComponent,
}, {
  path: 'centers', component: AnimalCenterList,
}, {
  path: 'centers/add', component: AnimalCenterAddComponent,
}, {
  path: 'animal', component: AnimalListComponent,
}, {
  path: 'animal/add', component: AddAnimalComponent,
}, {
  path: 'my-fav-animals', component: AnimalListComponent,
},
  {
    path: 'user-management', component: UserManagementComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true, onSameUrlNavigation: 'reload',
  }),], exports: [RouterModule],
})
export class AppRoutingModule {
}
