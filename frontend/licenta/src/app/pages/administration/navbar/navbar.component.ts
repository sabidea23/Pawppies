import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, Scroll } from '@angular/router';
import {NotificationService} from "../../../services/notification.service";


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
    public router: Router,

    public notificationService: NotificationService)
  {
      this.router.events.subscribe((event: any) => {
        if (event instanceof Scroll && event.anchor) {
          setTimeout(() => {
            this.scroll('#' + event.anchor);
          }, 100);
        }
      });
  }

  unreadCount: number = 0;
   notifications: any = [];


  private getNotifications() {
    this.notificationService.getNotificationsByUserId(this.user.id).subscribe(
      notifications => {
        // @ts-ignore
        this.notifications = notifications.sort((a, b) => {
          return new Date(b.localDate).getTime() - new Date(a.localDate).getTime();
        });
        this.unreadCount = notifications.filter(notification => !notification.isReadByUser).length;
        console.log(this.notifications);
        console.log(this.unreadCount);
      },
      error => {
        console.error('There was an error retrieving the notifications', error);
      }
    );
  }


  markAllNotificationsAsRead(): void {
    // @ts-ignore
    this.notifications.forEach(notification => {
      // @ts-ignore
      if (!notification.isReadByUser) {
        // @ts-ignore
        this.notificationService.userReadNotificationById(this.user.id, notification.id).subscribe(
          () => {
            // @ts-ignore
            notification.isReadByUser = true;
          },
          error => {
            console.error('Error marking notification as read', error);
          }
        );
      }
      this.unreadCount = 0;
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

    if (this.user) {
      this.getNotifications();
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

  redirectToDogAdoption() {
    this.router.navigate(['/adopt-dogs']).then((_) => { });

  }

  redirectToFeedDog() {
    this.router.navigate(['/feed-dog']).then((_) => { });

  }
  redirectToDogTraining() {
    this.router.navigate(['/training-dog']).then((_) => { });

  }
  redirectToDogHealth() {
    this.router.navigate(['/health-dog']).then((_) => { });

  }
  redirectToCatAdoption() {
    this.router.navigate(['/adopt-cats']).then((_) => { });

  }
  redirectToFeedCat() {
    this.router.navigate(['/feed-cat']).then((_) => { });

  }
  redirectToCatBehavior() {
    this.router.navigate(['/admin/behavior-cat']).then((_) => { });

  }
  redirectToCatHealth() {
    this.router.navigate(['/health-cat']).then((_) => { });

  }

  redirectToMission() {
    this.router.navigate(['/about-pets/mission']).then((_) => { });

  }
}
