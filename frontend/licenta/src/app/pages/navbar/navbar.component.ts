import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, Scroll } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],

})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user: any = null;

  constructor(
    public login: LoginService,
    public router: Router) {
      this.router.events.subscribe((event: any) => {
        if (event instanceof Scroll && event.anchor) {
          setTimeout(() => {
            this.scroll('#' + event.anchor);
          }, 100);
        }
      });
  }

  private scroll(query: string) {
    const targetElement = document.querySelector(query);
    if (!targetElement) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (!this.isInViewport(targetElement)) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private isInViewport = (elem: any) => {
    const bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });

    let itemJson = {
      value: 'true',
      timestamp: new Date().getTime(),
    }
    const summStorageItem = sessionStorage.getItem('initSumm');

    if (summStorageItem == undefined || summStorageItem == '' || summStorageItem == null) {
      // Update the `sessionStorage` item
      sessionStorage.setItem('initSumm', JSON.stringify(itemJson));

    } else {
      // Check if the `sessionStorage` item is fresh or old
      const summStorageItemJson = JSON.parse(summStorageItem);
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - summStorageItemJson.timestamp;
      const timeDiffInSeconds = Math.floor(timeDiff / 1000);

      if (timeDiffInSeconds >= 300) {
        // Update timestamp
        itemJson = {
          value: 'true',
          timestamp: new Date().getTime(),
        }

        // Update the `sessionStorage` item
        sessionStorage.setItem('initSumm', JSON.stringify(itemJson));

      }
    }
  }

  public logout() {
    this.login.logout();
    window.location.reload();
  }



  public toProfileSettings() {
    const user_role = this.login.getUserRole();
      this.router.navigate(['/profile']).then((_) => { });
  }

  public redirectAnimalCenter() {

      this.router.navigate(['/centers']).then((_) => { });

  }

  public redirectToAboutPawppies() {
    this.router.navigate(['/about-pets']).then((_) => { });
  }

  public redirectToDogBreeds() {
    this.router.navigate(['/breed-details-dog']).then((_) => { });
  }

  public redirectToCatBreeds() {
    this.router.navigate(['/breed-details-cat']).then((_) => { });
  }
  isSubMenuOpen = true;
  profileDetailMenu = false;

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
    if (this.profileDetailMenu) {
      this.profileDetailMenu = !this.profileDetailMenu;
    }
  }

  openUserMenu() {
    this.profileDetailMenu = !this.profileDetailMenu;
    if (this.isSubMenuOpen) {
      this.isSubMenuOpen = !this.isSubMenuOpen;
    }
  }

  public getUserRole() {
    return this.login.getUserRole();
  }

  redirectToFavoriteAnimalsPage() {
    const user_role = this.login.getUserRole();
      this.router.navigate(['/my-fav-animals',{ userId: this.user.id }]).then((_) => { });
  }

  redirectToLoginPage() {
    this.router.navigate(['/login']).then((_) => { });
  }

  toUserManagement() {
    this.router.navigate(['/admin/user-management']).then((_) => { });

  }
}
