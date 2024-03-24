import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import FuzzySearch from 'fuzzy-search';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  admin = this.login.getUser();
  users: any = [];
  filteredUsers: any = [];
  searchItem: string = '';

  roles = ['NORMAL', 'SUPPLIER'];

  constructor(
    private login: LoginService,
    private snack: MatSnackBar,
    private userService: UserService
  ) { }

  deleteUser(id:any) {
    this.userService.deleteUser(id).subscribe({
      next: (data: any) => {
      }
    });
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: any) => {
        if (data && data.length > 1) {
          // Elimină primul element din listă dacă există cel puțin un element în listă
          this.users = data.slice(1);
          this.filteredUsers = data.slice(1);
        } else {
          // Dacă lista conține un singur element sau este goală, păstrează-o așa cum este
          this.users = data;
          this.filteredUsers = data;
        }
      },
    });
  }


  public getUserRole(user: any) {
    return user.authorities[0].authority;
  }

  public changeRole(user: any, role: string) {
    this.userService.updateUserRole(user.username, role).subscribe({
      next: (_: any) => {
        this.snack.open('Role updated successfully!', 'OK', {
          duration: 3000,
        });
      },
    });
  }

  public searchUser(searchItem: string) {
    this.filteredUsers = this.users;
    const searcher = new FuzzySearch(this.filteredUsers, ['username']);

    this.filteredUsers = searcher.search(searchItem);
  }
}
