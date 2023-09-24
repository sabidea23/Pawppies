import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';

import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './pages/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { authInterceptorProviders } from './services/auth.interceptor';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './pages/admin/sidebar/sidebar.component';
import { MatTableModule } from '@angular/material/table';
import { UniversityAddComponent } from './pages/admin/university-add/university-add.component';
import { UniversityListComponent } from './components/university-list/university-list.component';
import { SidebarUserComponent } from './pages/user/sidebar-user/sidebar-user.component';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { ReviewAddComponent } from './components/review-add/review-add.component';
import { UserManagementComponent } from './pages/admin/user-management/user-management.component';
import { UniversityTopComponent } from './components/university-top/university-top.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    ReviewAddComponent,
    ReviewListComponent,
    SidebarComponent,
    UniversityAddComponent,
    UniversityListComponent,
    UniversityTopComponent,
    SidebarUserComponent,
    UserManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatChipsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterOutlet
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
