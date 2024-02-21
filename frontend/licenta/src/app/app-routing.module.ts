import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './register/signup/signup.component';
import { LoginComponent } from './register/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';
import { ProfileComponent } from './user/profile/profile.component';
import { ReviewListComponent } from './animal.process/list-animal/review-list.component';
import { UniversityAddComponent } from './animal.process/add-center/university-add.component';
import { UniversityListComponent } from './animal.process/list-center/university-list.component';
import { ReviewAddComponent } from './animal.process/add-animal/review-add.component';
import { UserManagementComponent } from './user/user-management/user-management.component';
import {AboutPetsComponent} from "./pages/about-pets/about-pets.component";
import {MissionComponent} from "./pages/mission/mission.component";
import {QuizComponent} from "./user/quiz/quiz.component";

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
    path: 'about-pets/mission',
    component: MissionComponent,
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
        component: UniversityListComponent,
      },
      {
        path: 'universities/add',
        component: UniversityAddComponent,
      },
      {
        path: 'university-reviews',
        component: ReviewListComponent,
      },
      {
        path: 'university-reviews/add',
        component: ReviewAddComponent,
      },
      {
        path: 'my-reviews',
        component: ReviewListComponent,
      },
      {
        path: 'users',
        component: UserManagementComponent,
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
        component: UniversityListComponent,
      },
      {
        path: 'university-reviews',
        component: ReviewListComponent,
      },
      {
        path: 'university-reviews/add',
        component: ReviewAddComponent,
      },
      {
        path: 'my-reviews',
        component: ReviewListComponent,
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
