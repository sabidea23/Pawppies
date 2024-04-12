import { Component } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../services/user.service";

import {AdoptionRequestService} from "../../services/adoption.request.service";
import {forkJoin, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-requests-management',
  templateUrl: './requests-management.component.html',
  styleUrls: ['./requests-management.component.css']
})
export class RequestsManagementComponent {

  user: any;
  requests: any[] = [];

  constructor(private router: Router, private adoptionRequestService: AdoptionRequestService, private loginService: LoginService, private snackBar: MatSnackBar, private userService: UserService) {
    this.user = this.loginService.getUser();
    this.getRequestsForAnimalCenter();
  }

  displayedColumns: string[] = ['requestId', 'userName', 'userInfo', 'reason', 'postedDate', 'animalName', 'status', 'actions'];

  calculateDueDate(date: Date): Date {
    const result = new Date(date); // Crează o nouă instanță de dată pentru a evita modificarea originalului
    result.setDate(result.getDate() + 5); // Adaugă 5 zile
    return result;
  }



  redirectToAnimalPage(request:any) {
    this.router.navigate(['/animal-details', {animalId: request.animal.id}]).then((_) => {
    });
  }

  setPending(requestId: number) {
    // Logic to set the request to pending
    this.adoptionRequestService.updatePendingRequests(requestId).subscribe(
      {
        next:() => {
          this.getRequestsForAnimalCenter();

        }
      }
    );
  }

  acceptRequest(requestId: number) {
    // Logic to accept the request
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

  getRequestsForAnimalCenter(): void {
    this.adoptionRequestService.getRequestsForAnimalCenterId(this.user.animalCenters[0].id)
      .subscribe({
        next: (requests: any[]) => {
          if (requests.length > 0) {
            const enrichedRequests$: Observable<any>[] = requests.map(request => {
              const animalDetails$ = this.adoptionRequestService.getAnimalFromRequest(request.id).pipe(
                map(animal => ({ ...request, animal }))
              );
              const userDetails$ = this.adoptionRequestService.getUserForRequest(request.id).pipe(
                map(user => ({ ...request, user }))
              );
              return forkJoin([animalDetails$, userDetails$]).pipe(
                map(([animalData, userData]) => ({ ...request, animal: animalData.animal, user: userData.user }))
              );
            });

            forkJoin(enrichedRequests$).subscribe(enrichedRequests => {
              this.requests = enrichedRequests;
              console.log('Requests with animals and users:', this.requests);
            });
          } else {
            console.log('No requests found for this center.');
            this.snackBar.open('No requests found for this center.', 'OK', { duration: 3000 });
          }
        },
        error: (err) => {
          console.error('Error loading requests:', err);
          this.snackBar.open('Failed to load requests!', 'OK', { duration: 3000 });
        }
      });
  }
}
