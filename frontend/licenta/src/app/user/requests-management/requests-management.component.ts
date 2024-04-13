import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user.service";

import {AdoptionRequestService} from "../../services/adoption.request.service";
import {forkJoin, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {catBreeds, dogBreedsName} from "../../utils/breeds-store";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-requests-management',
  templateUrl: './requests-management.component.html',
  styleUrls: ['./requests-management.component.css']
})
export class RequestsManagementComponent  implements AfterViewInit {

  user: any;
  requests: any[] = [];
  filteredRequests: any = [];
  displayedColumns: string[] = ['requestId', 'userName', 'userInfo', 'reason', 'postedDate', 'animalName', 'status', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  // @ts-ignore
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private router: Router, private adoptionRequestService: AdoptionRequestService, private loginService: LoginService, private snackBar: MatSnackBar, private userService: UserService) {
    this.user = this.loginService.getUser();
    this.getRequestsForAnimalCenter();
  }

  calculateDueDate(date: Date): Date {
    const result = new Date(date); // Crează o nouă instanță de dată pentru a evita modificarea originalului
    result.setDate(result.getDate() + 5); // Adaugă 5 zile
    return result;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  redirectToAnimalPage(request: any) {
    this.router.navigate(['/animal-details', {animalId: request.animal.id}]).then((_) => {
    });
  }

  setPending(requestId: number) {
    // Logic to set the request to pending
    this.adoptionRequestService.updatePendingRequests(requestId).subscribe({
      next: () => {
        this.getRequestsForAnimalCenter();

      }
    });
  }

  acceptRequest(requestId: number) {
    // Logic to accept the request
    this.adoptionRequestService.acceptRequest(requestId).subscribe({
      next: (data) => {

        Swal.fire({
          title: 'Success!', text: 'Adoption Request accepted', icon: 'success', background: 'rgb(230, 230, 230)',
        }).then((_) => {
          this.getRequestsForAnimalCenter();
        });
      },
    });
  }

  rejectRequest(requestId: number) {
    // Logic to reject the request
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to reject this request?',
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
        this.adoptionRequestService.rejectRequest(requestId).subscribe({
          next: () => {
            this.getRequestsForAnimalCenter();

          }
        });
      }
    });
  }

  totalElements:any;
  totalPages = 0;


  getRequestsForAnimalCenter(): void {
    this.adoptionRequestService.getRequestsForAnimalCenterId(this.user.animalCenters[0].id)
      .subscribe({
        next: (requests: any[]) => {
          if (requests.length > 0) {
            const enrichedRequests$: Observable<any>[] = requests.map(request => {
              const animalDetails$ = this.adoptionRequestService.getAnimalFromRequest(request.id).pipe(map(animal => ({
                ...request, animal
              })));
              const userDetails$ = this.adoptionRequestService.getUserForRequest(request.id).pipe(map(user => ({
                ...request, user
              })));
              return forkJoin([animalDetails$, userDetails$]).pipe(map(([animalData, userData]) => ({
                ...request, animal: animalData.animal, user: userData.user
              })));
            });

            forkJoin(enrichedRequests$).subscribe(enrichedRequests => {
              this.dataSource.data = enrichedRequests;
              this.requests = enrichedRequests;
              this.filterRequests();
              console.log(this.filteredRequests);
              this.totalElements = this.requests.length;

              console.log('Requests with animals and users:', this.requests);
            });
          } else {
            console.log('No requests found for this center.');
            this.snackBar.open('No requests found for this center.', 'OK', {duration: 3000});
          }
        }, error: (err) => {
          console.error('Error loading requests:', err);
          this.snackBar.open('Failed to load requests!', 'OK', {duration: 3000});
        }
      });
  }

  //filtrare
  filters: any = {
    status: [],

  };

  pressedButton: { [key: string]: boolean } = {};


  toggleButton(key: string) {
    this.pressedButton[key] = !this.pressedButton[key];
  }

  applyFilter(category: string, value: any): void {

    if (this.filters[category].includes(value)) {
      // @ts-ignore
      this.filters[category] = this.filters[category].filter(item => item !== value);
    } else {
      this.filters[category].push(value);
    }
    this.filterRequests();
  }


  filterRequests(): void {
    // @ts-ignore
    this.dataSource.data = this.requests.filter(request => {
      return (this.getStatusForRequest(request) && this.filterByName(request.animal) && this.filterByUser(request.user))
    });
  }

  getStatusForRequest(request: any): boolean {

    let status = '';
    if (request.status == 'SUBMITTED') status = 'SUBMITTED'; else if (request.status == 'PENDING') status = 'PENDING';

    return !(this.filters.status && this.filters.status.length > 0 && !this.filters.status.includes(status));
  }

  searchTerms: string[] = [];
  searchTerm: string = '';

  addSearchTerm(term: string): void {
    if (term && !this.searchTerms.includes(term)) {
      this.searchTerms.push(term);
      this.filterRequests();
    }
    this.searchTerm = '';
  }

  removeSearchTerm(term: string): void {
    this.searchTerms = this.searchTerms.filter(t => t !== term);
    this.filterRequests();
  }

  filterByName(animal: any): boolean {
    return this.searchTerms.length ? this.searchTerms.some(name => animal.name.toLowerCase().includes(name.toLowerCase())) : true;
  }

  userSearchTerms: string[] = [];
  usernameFilter: string = '';

  addUserSearchTerm(term: string): void {
    if (term && !this.userSearchTerms.includes(term)) {
      this.userSearchTerms.push(term);
      this.filterRequests();
    }
    this.usernameFilter = '';
  }

  removeUserSearchTerm(term: string): void {
    this.userSearchTerms = this.userSearchTerms.filter(t => t !== term);
    this.filterRequests();
  }

  filterByUser(user: any): boolean {
    return this.userSearchTerms.length ? this.userSearchTerms.some(userName => user.username.toLowerCase().includes(userName.toLowerCase())) : true;
  }

}
