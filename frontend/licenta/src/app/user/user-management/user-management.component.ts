import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoginService} from 'src/app/services/login.service';
import {UserService} from 'src/app/services/user.service';
import FuzzySearch from 'fuzzy-search';
import Swal from "sweetalert2";

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

  constructor(private login: LoginService, private snack: MatSnackBar, private userService: UserService) {
  }

  deleteUser(id: any) {
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this user? All his activity will be deleted',
      icon: 'warning',
      background: '#fff',
      customClass: {
        confirmButton: 'confirm-button-class', cancelButton: 'cancel-button-class'
      },
      showCancelButton: true,
      confirmButtonText: 'DELETE',
      cancelButtonText: 'CANCEL',
      cancelButtonColor: '#6504B5',
      confirmButtonColor: '#FF1053',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe({
          next: (data: any) => {
            this.getUsers();
          }
        });
      }
    });
  }

  getUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data: any) => {
        if (data && data.length > 1) {
          this.users = data.slice(1);
          this.filteredUsers = data.slice(1);
        } else {
          this.users = data;
          this.filteredUsers = data;
        }
      },
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  public getUserRole(user: any) {
    return user.authorities[0].authority;
  }

  public changeRole(user: any, role: string) {
    this.userService.updateUserRole(user.username, role).subscribe({});
  }

  public searchUser(searchItem: string) {
    this.filteredUsers = this.users;
    const searcher = new FuzzySearch(this.filteredUsers, ['username']);
    this.filteredUsers = searcher.search(searchItem);
  }
}
