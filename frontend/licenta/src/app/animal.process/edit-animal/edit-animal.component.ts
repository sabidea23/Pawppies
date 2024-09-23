import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MapDialogComponent } from "../../utils/map-dialog/map-dialog.component";

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.css']
})
export class EditAnimalComponent {
  editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    size: new FormControl('', Validators.required),
    coatLength: new FormControl('', Validators.required),
    health: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public animal: any
  ) {
    this.loadInitialData();
  }

  loadInitialData() {
    this.editForm.patchValue({
      name: this.animal.name,
      age: this.animal.age,
      health: this.animal.health,
      description: this.animal.description,
      size: this.animal.size,
      coatLength: this.animal.coatLength,
    });
  }

  save() {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value);
    }
  }

  getAgeOptions(): string[] {
    if (this.animal.type === 'Dog') {
      return ['Puppy', 'Young', 'Adult', 'Senior'];
    } else if (this.animal.type === 'Cat') {
      return ['Kitten', 'Young', 'Adult', 'Senior'];
    } else return ['Young', 'Adult', 'Senior'];
  }

  getSizeOptions(): string[] {
    if (this.animal.type === 'Dog') {
      return ['Small (0-25 ibs)', 'Medium (26-60 ibs)', 'Large (61-100) ibs', 'Extra Large (101 ibs or more)']; // Sunt doar exemple, pune valorile dorite
    } else if (this.animal.type == 'Cat') {
      return ['Small (0-6 ibs)', 'Medium (7-11 ibs)', 'Large (12-17) ibs', 'Extra Large (18 ibs or more)'];
    }
    return ['Small=', 'Medium', 'Large', 'Extra Large'];
  }
}
