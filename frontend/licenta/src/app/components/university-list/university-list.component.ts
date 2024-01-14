import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {UniversityService} from '../../services/university.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import FuzzySearch from 'fuzzy-search';
import {MatDialog} from '@angular/material/dialog';
import {MapDialogComponent} from '../map-dialog/map-dialog.component';
import {EditUniversityComponent} from "../../pages/admin/edit-university/edit-university.component";
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {countries} from "../../utils/country-data-store";

@Component({
  selector: 'app-university-list',
  templateUrl: './university-list.component.html',
  styleUrls: ['./university-list.component.css'],
})
export class UniversityListComponent implements OnInit {

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  displayedColumns: string[] = ['university', 'petList', 'cityState', 'contact', 'showOnMap'];

  displayedColumnsAdmin: string[] = ['university', 'petList', 'cityState', 'contact', 'showOnMap', 'edit', 'delete'];

  user = this.login.getUser();
  universities: any = [];
  filteredUniversities: any = [];
  searchItem: string = '';
  totalElements: number = 0;
  public countries: any = countries;

  searchData = {
    city: '', country: '', name: '', distance: ''
  }

  searchFilters: any[] = [];

  constructor(private login: LoginService, private router: Router, private snack: MatSnackBar, private universityService: UniversityService, private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.getUniversities({page: "0", size: "5"});
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  performSearch() {
    // Logica de căutare...

    // Să presupunem că actualizăm filtrele de căutare
    this.searchFilters = [{type: 'City', value: this.searchData.city}, {
      type: 'Country',
      value: this.searchData.country
    }, {type: 'Name', value: this.searchData.name}, {type: 'Max Distance', value: this.searchData.distance},];
  }

  public handlePageEvent(event: PageEvent): void {
    this.getUniversities({page: event.pageIndex, size: event.pageSize});
  }

  private getUniversities(request: any) {
    this.universityService.getAllUniversities(request)
      .subscribe(data => {
        console.log(data)
        this.universities = data['content'];
        this.dataSource.data = data['content'];
        this.filteredUniversities = data['content'];
        this.totalElements = data['totalElements'];
      }, error => {
        console.log(error.error.message);
      });
  }

  public getUserRole() {
    return this.login.getUserRole();
  }

  public goToReviews(university: any) {
    const user_role = this.login.getUserRole();
    if (user_role == 'ADMIN') this.router
      .navigate(['/admin/university-reviews', {universityId: university.id},])
      .then((_) => {
      }); else if (user_role == 'NORMAL') this.router
      .navigate(['/user-dashboard/university-reviews', {universityId: university.id},])
      .then((_) => {
      });
  }

  public editUniversity(university: any) {
    const dialogRef = this.dialog.open(EditUniversityComponent, {
      width: '500px', data: university
    });

    dialogRef.afterClosed().subscribe(updatedData => {
      let modify = false;
      if (updatedData) {

        if ((university.name != updatedData.name) || (university.city != updatedData.city) || (university.longitude != updatedData.longitude) || (university.latitude != updatedData.latitude) || (university.contact != updatedData.contact)) {
          modify = true;
        }
        university.name = updatedData.name;
        university.city = updatedData.city;
        university.longitude = updatedData.longitude;
        university.latitude = updatedData.latitude;
        university.contact = updatedData.contact;
        const backedUpAuthorities = university.admin.authorities;
        university.admin.authorities = undefined;

        this.universityService.updateUniversity(university).subscribe({
          next: (_) => {
            // Restore authorities, maybe it will be needed later
            university.admin.authorities = backedUpAuthorities;

            this.universities = this.universities.map((u: any) => {
              if (u.id === university.id) {
                u = university;
              }
              return u;
            });

            if (modify) {
              Swal.fire({
                title: 'Edited!',
                text: 'Your animal center has been edited.',
                icon: 'success',
                background: '#fff',
                customClass: {
                  confirmButton: 'confirm-button-class',
                },
                confirmButtonText: 'OK',
                confirmButtonColor: '#6504B5',
              });
            }
          }, error: (error) => {
            this.snack.open(error.error.message, 'OK', {
              duration: 3000,
            });
          },
        });
      }

    });
  }


  public deleteUniversity(university: any) {
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this Animal Center? This action cannot be undone.',
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
        this.universityService.deleteUniversityById(university.id).subscribe({
          next: (_) => {
            this.universities = this.universities.filter((u: any) => u.id !== university.id);
            Swal.fire({
              title: 'Deleted!',
              text: 'Your animal center has been deleted.',
              icon: 'success',
              background: '#fff',
              customClass: {
                confirmButton: 'confirm-button-class',
              },
              confirmButtonText: 'OK',
              confirmButtonColor: '#6504B5',
            }).then((_) => {
              window.location.reload();
            });
          }, error: (error) => {
            this.snack.open(error.error.message, 'OK', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  public searchUniversity(searchItem: string) {
    this.filteredUniversities = this.universities;
    const searcher = new FuzzySearch(this.filteredUniversities, ['name']);

    this.filteredUniversities = searcher.search(searchItem);
  }

  public showOnMap(university: any) {
    this.dialog.open(MapDialogComponent, {
      width: '600px', data: university
    });
  }

  showAllCenters(): void {
    this.resetFilters();
    this.performSearch();
  }

  resetFilters(): void {
    // Reset your search filters here
    this.searchData = {
      city: '',
      country: '',
      name: '',
      distance: ''
    };
    // Any other filter reset logic goes here
  }
}
