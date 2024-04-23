import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  preferencesData = new FormGroup({
    //type
    type: new FormControl('', [Validators.required]),

    //general info
    age: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    coatLength: new FormControl('', [Validators.required]),

    //lifestyle
    activityLevel: new FormControl(''),

    friendlinessToChildrenYes: new FormControl(''),
    friendlinessToChildrenNo: new FormControl(''),

    friendlinessToOtherAnimalsNo: new FormControl('', [Validators.required]),
    friendlinessToOtherAnimalsYes: new FormControl('', [Validators.required]),
    affectionForOwnersYes: new FormControl('', [Validators.required]),
    affectionForOwnersNo: new FormControl('', [Validators.required]),
    groomingRequirements: new FormControl('', [Validators.required]),

    //health
    hasSpecialNeedsNo: new FormControl('', [Validators.required]),
    hasSpecialNeedsYes: new FormControl('', [Validators.required]),
    isFullyVaccinatedYes: new FormControl('', [Validators.required]),
    isFullyVaccinatedNo: new FormControl('', [Validators.required]),

    //dog
    exerciseRequirements: new FormControl('', [Validators.required]),

    isTrainedYes: new FormControl('', [Validators.required]),
    isTrainedNo: new FormControl('', [Validators.required]),
    watchfulnessNo: new FormControl('', [Validators.required]),
    watchfulnessYes: new FormControl('', [Validators.required]),

    //cat
    needForAttention: new FormControl('', [Validators.required]),

    intelligenceYes: new FormControl('', [Validators.required]),
    intelligenceNo: new FormControl('', [Validators.required]),

    independenceYes: new FormControl('', [Validators.required]),
    independenceNo: new FormControl('', [Validators.required]),
  });

  user = this.login.getUser();

  constructor( private route: ActivatedRoute,  private snack: MatSnackBar, private login: LoginService, private router: Router) {
  }
  getAgeOptions(animalType: any): string[] {
    if (animalType === 'Dog') {
      return ['Puppy', 'Adult', 'Senior']; // Sunt doar exemple, pune valorile dorite
    } else if (animalType === 'Cat') {
      return ['Kitten', 'Adult', 'Senior']; // Sunt doar exemple, pune valorile dorite
    } else return ['Young', 'Adult', 'Senior'];
  }
  ngOnInit(): void {

  }

  formSubmit() {
  }

}
