import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './register/signup/signup.component';
import {LoginComponent} from './register/login/login.component';
import {HomeComponent} from './pages/administration/home/home.component';
import {ProfileComponent} from './user/profile/profile.component';
import {AnimalListComponent} from './animal.process/list-animal/animal-list.component';
import {AnimalCenterAddComponent} from './animal.process/add-center/animal-center-add.component';
import {AnimalCenterList} from './animal.process/list-center/animal-center-list.component';
import {AddAnimalComponent} from './animal.process/add-animal/add-animal.component';
import {AboutPetsComponent} from "./pages/administration/about-pets/about-pets.component";
import {MissionComponent} from "./pages/administration/mission/mission.component";
import {QuizComponent} from "./user/quiz/quiz.component";
import {BreedDetailsDogComponent} from "./pages/breeds/breed-details-dogs/breed-details-dog.component";
import {BreedDetailsCatComponent} from "./pages/breeds/breed-details-cat/breed-details-cat.component";
import {BreedDogComponent} from "./pages/breeds/breed-dog/breed-dog.component";
import {UserManagementComponent} from "./user/user-management/user-management.component";
import {AdminGuard} from "./services/admin.guard";
import {SupplierGuard} from "./services/supplier.guard";
import {CenterDetailsComponent} from "./animal.process/center-details/center-details.component";
import {CutestDogsComponent} from "./pages/adopt-dog/cutest-dogs/cutest-dogs.component";
import {ApartamnetsDogsComponent} from "./pages/adopt-dog/apartamnets-dogs/apartamnets-dogs.component";
import {KidsDogsComponent} from "./pages/adopt-dog/kids-dogs/kids-dogs.component";
import {PopularDogsComponent} from "./pages/adopt-dog/popular-dogs/popular-dogs.component";
import {BreedCatComponent} from "./pages/breeds/breed-cat/breed-cat.component";
import {AnimalDetailsComponent} from "./animal.process/animal-details/animal-details.component";
import {ContactComponent} from "./pages/administration/contact/contact.component";
import {FaqsComponent} from "./pages/administration/faqs/faqs.component";
import {PrivacyPolicyComponent} from "./pages/administration/privacy-policy/privacy-policy.component";
import {TermsServiceComponent} from "./pages/administration/terms-service/terms-service.component";
import {AboutDogsComponent} from "./pages/adopt-dog/infomration/about-dogs/about-dogs.component";
import {AboutCatComponent} from "./pages/adopt-cat/information/about-cat/about-cat.component";
import {FeedCatComponent} from "./pages/adopt-cat/information/feed-cat/feed-cat.component";
import {FeedDogComponent} from "./pages/adopt-dog/infomration/feed-dog/feed-dog.component";
import {CatHealthComponent} from "./pages/adopt-cat/information/cat-health/cat-health.component";
import {DogHealthComponent} from "./pages/adopt-dog/infomration/dog-health/dog-health.component";
import {DogTrainingComponent} from "./pages/adopt-dog/infomration/dog-training/dog-training.component";
import {CatBehaviorComponent} from "./pages/adopt-cat/information/cat-behavior/cat-behavior.component";
import {BestCatKidsComponent} from "./pages/adopt-cat/best-cat-kids/best-cat-kids.component";
import {FluffyCatComponent} from "./pages/adopt-cat/fluffy-cat/fluffy-cat.component";
import {HairlessCatComponent} from "./pages/adopt-cat/hairless-cat/hairless-cat.component";
import {CuteCaatComponent} from "./pages/adopt-cat/cute-caat/cute-caat.component";
import {AdoptionRequestComponent} from "./animal.process/adoption-request/adoption-request.component";

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
  path: 'faqs', component: FaqsComponent, pathMatch: 'full',
}, {
  path: 'contact', component: ContactComponent, pathMatch: 'full',
}, {
  path: 'about-pets/mission', component: MissionComponent, pathMatch: 'full',
}, {
  path: 'adoption-request', component: AdoptionRequestComponent, pathMatch: 'full',
}, {
  path: 'breed-dog', component: BreedDogComponent, pathMatch: 'full',
}, {
  path: 'quiz', component: QuizComponent,
}, {
  path: 'profile', component: ProfileComponent,
}, {
  path: 'centers', component: AnimalCenterList,
}, {
  path: 'center-details', component: CenterDetailsComponent,
}, {
  path: 'animal-details', component: AnimalDetailsComponent,
}, {
  path: 'cutest-dogs', component: CutestDogsComponent,
}, {
  path: 'apartments-dogs', component: ApartamnetsDogsComponent,
}, {
  path: 'kids-dogs', component: KidsDogsComponent,
}, {
  path: 'popular-dogs', component: PopularDogsComponent,
}, {
  path: 'kids-cat', component: BestCatKidsComponent,
}, {
  path: 'fluffy-cats', component: FluffyCatComponent,
}, {
  path: 'hairless-cats', component: HairlessCatComponent,
}, {
  path: 'cutest-cats', component: CuteCaatComponent,
}, {
  path: 'breed-cat', component: BreedCatComponent,
}, {
  path: 'animal', component: AnimalListComponent,
}, {
  path: 'my-fav-animals', component: AnimalListComponent,
}, {
  path: 'privacy-policy', component: PrivacyPolicyComponent,
}, {
  path: 'terms-of-service', component: TermsServiceComponent,
}, {
  path: 'adopt-dogs', component: AboutDogsComponent,
}, {
  path: 'adopt-cats', component: AboutCatComponent,
}, {
  path: 'feed-cat', component: FeedCatComponent,
}, {
  path: 'feed-dog', component: FeedDogComponent,
}, {
  path: 'health-cat', component: CatHealthComponent,
}, {
  path: 'health-dog', component: DogHealthComponent,
}, {
  path: 'training-dog', component: DogTrainingComponent,
}, {
  path: 'behavior-cat', component: CatBehaviorComponent,
}, {
  path: 'admin', canActivate: [AdminGuard], children: [{
    path: 'user-management', component: UserManagementComponent,
  }]
}, {
  path: 'supplier', canActivate: [SupplierGuard], children: [{
    path: 'animal/add', component: AddAnimalComponent,
  }, {
    path: 'centers/add', component: AnimalCenterAddComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true, onSameUrlNavigation: 'reload',
  }),], exports: [RouterModule],
})
export class AppRoutingModule {
}
