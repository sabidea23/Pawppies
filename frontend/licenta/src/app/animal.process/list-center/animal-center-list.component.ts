import {Component, OnInit, ViewChild} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {AnimalCenterService} from '../../services/animal.center.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MapDialogComponent} from '../../utils/map-dialog/map-dialog.component';
import {EditAnimalCenterComponent} from "../edit-center/edit-animal-center.component";
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {countries} from "../../utils/country-data-store";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'app-animal-center-list',
  templateUrl: './animal-center-list.component.html',
  styleUrls: ['./animal-center-list.component.css'],
})
export class AnimalCenterList implements OnInit {

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  displayedColumns: string[] = ['animalCenter', 'petList', 'cityState', 'contact', 'showOnMap'];

  displayedColumnsSupplier: string[] = ['animalCenter', 'petList', 'cityState', 'contact', 'showOnMap', 'edit', 'delete'];

  getHeader() {
  if (this.getUserRole() == "SUPPLIER" ) {
      return this.displayedColumnsSupplier;
    }
    return this.displayedColumns;
  }

  user = this.login.getUser();
  animalCenters: any = [];
  filteredAnimalCenters: any = [];
  totalElements: number = 0;
  public countries: any = countries;

  searchData = {
    city: '', country: '', name: '', distance: 0
  }

  searchFilters: any[] = [];

  constructor(private login: LoginService, private router: Router, private snack: MatSnackBar,
              private animalCenterService: AnimalCenterService, private dialog: MatDialog,
              private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.searchService.searchFilters$.subscribe(filters => {
      // @ts-ignore
      if (Object.keys(filters).length) {
        this.searchData = filters;
        this.performSearch();
      }
    });
    this.user = this.login.getUser();
    this.getAnimalCenters({page: "0", size: "10"});
    this.performSearch();
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  navigateToAddAnimalCenter() {
    this.router.navigate(['supplier/centers/add']);
  }

  navigateToCenterDetails(animalCenter : any) {
    this.router
      .navigate(['/center-details', {centerId: animalCenter.id},]);
  }

  public handlePageEvent(event: PageEvent): void {
    this.getAnimalCenters({page: event.pageIndex, size: event.pageSize});
  }

  public getUserRole() {
    return this.login.getUserRole() || 'GUEST';
  }

  public goToAnimalsPage(animalCenter: any) {
    this.router
      .navigate(['/animal', {centerId: animalCenter.id},])
      .then((_) => {
      });
  }

  public editAnimalCenter(animalCenter: any) {
    const dialogRef = this.dialog.open(EditAnimalCenterComponent, {
      width: '900px', data: animalCenter,
    });

    dialogRef.afterClosed().subscribe(updatedData => {
      let modify = false;
      if (updatedData) {

        animalCenter.name = updatedData.name;
        animalCenter.city = updatedData.city;
        animalCenter.longitude = updatedData.longitude;
        animalCenter.latitude = updatedData.latitude;
        animalCenter.contact = updatedData.contact;
        animalCenter.mission = updatedData.mission;
        animalCenter.openingHours = updatedData.openingHours;
        const backedUpAuthorities = animalCenter.admin.authorities;
        animalCenter.admin.authorities = undefined;

        this.animalCenterService.updateAnimalCenter(animalCenter).subscribe({
          next: (_) => {
            // Restore authorities, maybe it will be needed later
            animalCenter.admin.authorities = backedUpAuthorities;

            this.animalCenters = this.animalCenters.map((u: any) => {
              if (u.id === animalCenter.id) {
                u = animalCenter;
              }
              return u;
            });

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

          }, error: (error) => {
            this.snack.open(error.error.message, 'OK', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  public deleteAnimalCenter(animalCenter: any) {
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
        this.animalCenterService.deleteAnimalCenter(animalCenter.id).subscribe({
          next: (_) => {
            this.animalCenters = this.animalCenters.filter((u: any) => u.id !== animalCenter.id);
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


  public showOnMap(animalCenter: any) {
    this.dialog.open(MapDialogComponent, {
      width: '600px', data: animalCenter
    });
  }

  private getAnimalCenters(request: any) {
    this.animalCenterService.getAnimalCenters(request)
      .subscribe(data => {
        console.log(data)
        this.animalCenters = data['content'];
        this.dataSource.data = data['content'];
        this.filteredAnimalCenters = data['content'];
        this.totalElements = data['totalElements'];
        this.performSearch();
      }, error => {
        console.log(error.error.message);
      });
  }

  deleteFilter(filter: any) {
    var filterType = filter.type;
    filter.value = '';
    switch (filterType) {
      case 'City':
        this.searchData.city = '';
        break;
      case 'Country':
        this.searchData.country = '';
        break;
      case 'Name':
        this.searchData.name = '';
        break;
      case 'Max Distance':
        this.searchData.distance = 0;
        break;
    }
    this.performSearch();
  }


  performSearch() {
    this.filteredAnimalCenters = [...this.animalCenters];

    const trimmedCity = this.searchData.city.trim();
    const trimmedName = this.searchData.name.trim();

    if (trimmedCity) {
      // @ts-ignore
      this.filteredAnimalCenters = this.filteredAnimalCenters.filter(animalCenter => animalCenter.city.includes(trimmedCity));
    }
    if (trimmedName) {
      // @ts-ignore
      this.filteredAnimalCenters = this.filteredAnimalCenters.filter(animalCenter => animalCenter.name.includes(trimmedName));
    }

    if (this.searchData.city) {
      // @ts-ignore
      this.filteredAnimalCenters = this.filteredAnimalCenters.filter(animalCenter => animalCenter.city.includes(this.searchData.city));
    }

    if (this.searchData.country) {
      // @ts-ignore
      this.filteredAnimalCenters = this.filteredAnimalCenters.filter(animalCenter => animalCenter.country.includes(this.searchData.country));
    }

    if (this.searchData.distance && this.searchData.distance != 0) {
      // @ts-ignore
      this.filteredAnimalCenters = this.filteredAnimalCenters.filter(animalCenter => this.haversineDistance(this.user.latitude, this.user.longitude, animalCenter.latitude, animalCenter.longitude) <= this.searchData.distance );
    }

    this.searchFilters = [{type: 'City', value: this.searchData.city}, {
      type: 'Country',
      value: this.searchData.country
    }, {type: 'Name', value: this.searchData.name}, {type: 'Max Distance', value: this.searchData.distance}];

    this.dataSource.data = this.filteredAnimalCenters;
  }

  showAllCenters(): void {
    this.resetFilters();
    this.performSearch();
  }

  resetFilters(): void {
    this.searchData = {
      city: '', country: '', name: '', distance: 0
    };
  }

  // @ts-ignore
  haversineDistance(lat1, lon1, lat2, lon2) {
    // @ts-ignore
    function toRadians(degrees) {
      return degrees * Math.PI / 180;
    }

    var R = 6371; // km
    var dLat = toRadians(lat2 - lat1);
    var dLon = toRadians(lon2 - lon1);
    lat1 = toRadians(lat1);
    lat2 = toRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
