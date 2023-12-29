import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UniversityService } from '../../services/university.service';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { forkJoin } from 'rxjs';

// @ts-ignore
@Component({
  selector: 'app-university-top',
  templateUrl: './university-top.component.html',
  styleUrls: ['./university-top.component.css'],
})
export class UniversityTopComponent{
}
