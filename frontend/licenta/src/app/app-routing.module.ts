import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignupComponent} from './pages/signup/signup.component';
import {LoginComponent} from './pages/login/login.component';
import {HomeComponent} from './pages/home/home.component';
import {DashboardComponent} from './pages/admin/dashboard/dashboard.component';
import {UserDashboardComponent} from './pages/user/user-dashboard/user-dashboard.component';
import {AdminGuard} from './services/admin.guard';
import {NormalGuard} from './services/normal.guard';
import {ProfileComponent} from './components/profile/profile.component';
import {AnimalCenterAddComponent} from './pages/admin/animal-center-add/animal-center-add.component';
import {AnimalCenterComponent} from './components/animal-center-list/animal-center.component';
import {UserManagementComponent} from './pages/admin/user-management/user-management.component';
import {AnimalAddComponent} from "./components/animal-add/animal-add.component";
import {AnimalListComponent} from "./components/animal-list/animal-list.component";

const routes: Routes = [{
  path: '', component: HomeComponent, pathMatch: 'full',
}, {
  path: 'signup', component: SignupComponent, pathMatch: 'full',
}, {
  path: 'login', component: LoginComponent, pathMatch: 'full',
}, {
  path: 'admin', component: DashboardComponent, canActivate: [AdminGuard], children: [// {
    //   path: '',
    //   component: Home ///TO DO,
    // },
    {
      path: 'profile', component: ProfileComponent,
    }, {
      path: 'animal-centers', component: AnimalCenterComponent,
    }, {
      path: 'animal-centers/add', component: AnimalCenterAddComponent,
    }, {
      path: 'animal-centers-animals', component: AnimalListComponent,
    }, {
      path: 'animal-centers-animals/add', component: AnimalAddComponent,
    }, {
      path: 'my-animals', component: AnimalListComponent,
    }, {
      path: 'users', component: UserManagementComponent,
    },],
}, {
  path: 'user-dashboard', component: UserDashboardComponent, canActivate: [NormalGuard], children: [// {
    //   path: '',
    //   component: TO DO,
    // },
    {
      path: 'profile', component: ProfileComponent,
    }, {
      path: 'animal-centers', component: AnimalCenterComponent,
    }, {
      path: 'animal-centers-animals', component: AnimalListComponent,
    }, {
      path: 'animal-centers-animals/add', component: AnimalAddComponent,
    }, {
      path: 'my-animals', component: AnimalListComponent,
    },],
},];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true, onSameUrlNavigation: 'reload',
  }),], exports: [RouterModule],
})
export class AppRoutingModule {
}
