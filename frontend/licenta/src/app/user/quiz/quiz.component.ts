import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginService} from "../../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-quiz', templateUrl: './quiz.component.html', styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  preferencesData = new FormGroup({
    type: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    coatLength: new FormControl('', [Validators.required]),
    activityLevel: new FormControl(''),
    friendlinessToChildrenYes: new FormControl(false),
    friendlinessToChildrenNo: new FormControl(false),
    friendlinessToOtherAnimalsNo: new FormControl(false),
    friendlinessToOtherAnimalsYes: new FormControl(false),
    affectionForOwners: new FormControl('', [Validators.required]),
    groomingRequirements: new FormControl('', [Validators.required]),
    hasSpecialNeedsNo: new FormControl(false),
    hasSpecialNeedsYes: new FormControl(false),
    isFullyVaccinatedYes: new FormControl(false),
    isFullyVaccinatedNo: new FormControl(false),
    exerciseRequirements: new FormControl('', [Validators.required]),
    isTrainedYes: new FormControl(false),
    isTrainedNo: new FormControl(false),
    watchfulnessNo: new FormControl(false),
    watchfulnessYes: new FormControl(false),
    needForAttention: new FormControl('', [Validators.required]),
    intelligenceYes: new FormControl(false),
    intelligenceNo: new FormControl(false),
    independenceYes: new FormControl(false),
    independenceNo: new FormControl(false),
  });

  user = this.login.getUser();

  constructor(private userService: UserService, private route: ActivatedRoute, private snack: MatSnackBar, private login: LoginService, private router: Router) {
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
    const preferences = {
      type: this.preferencesData.get('type')?.value,
      age: this.preferencesData.get('age')?.value,
      gender: this.preferencesData.get('gender')?.value,
      size: this.preferencesData.get('size')?.value,
      activityLevel: this.preferencesData.get('activityLevel')?.value,
      groomingRequirements: this.preferencesData.get('groomingRequirements')?.value,
      friendlinessToChildren: this.preferencesData.get('friendlinessToChildrenYes')?.value,
      friendlinessToOtherAnimals: this.preferencesData.get('friendlinessToOtherAnimalsYes')?.value,
      affectionForOwners: this.preferencesData.get('affectionForOwners')?.value,
      hasSpecialNeeds: this.preferencesData.get('hasSpecialNeedsYes')?.value,
      isFullyVaccinated: this.preferencesData.get('isFullyVaccinatedYes')?.value,
      exerciseRequirements: this.preferencesData.get('exerciseRequirements')?.value,
      isTrained: this.preferencesData.get('isTrainedYes')?.value,
      watchfulness: this.preferencesData.get('watchfulnessYes')?.value,
      needForAttention: this.preferencesData.get('needForAttention')?.value,
      intelligence: this.preferencesData.get('intelligenceYes')?.value,
      independence: this.preferencesData.get('independenceYes')?.value,
    };

    const updatedUser = {
      ...this.user, preferences: preferences
    };

    const backedUpAuthorities = this.user.authorities;
    this.user.authorities = undefined;

    this.userService.updateUser(updatedUser).subscribe({
      next: () => {
        this.user.authorities = backedUpAuthorities;
        this.login.setUser(this.user);
        Swal.fire({
          title: 'Success!',
          text: 'Preferences submitted successfully',
          icon: 'success',
          background: 'rgb(230, 230, 230)',
        }).then((_) => {
          const user_role = this.login.getUserRole();
          this.router
            .navigate(['/profile'])
            .then((_) => {
            });
        });
      }, error: (err) => {
        this.snack.open('Failed to update preferences. Please try again.', 'OK', {duration: 3000});
        console.error('Update error:', err);
      }
    });
  }

}
