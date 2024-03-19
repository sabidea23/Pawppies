import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {DomSanitizer} from "@angular/platform-browser";
import {MapDialogComponent} from "../../utils/map-dialog/map-dialog.component";

// @ts-ignore
@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.css']
})
export class EditAnimalComponent {
  editData = {
    name: this.animal.name,
    age: this.animal.age,
    health: this.animal.health,
    description: this.animal.description,
    latitude: this.animal.latitude,
    care: this.animal.care,
    coatLength: this.animal.coatLength,
    size: this.animal.size,
    type: this.animal.type
  };

  getAgeOptions(animalType: string): string[] {
    if (animalType === 'Dog') {
      return ['Puppy', 'Young', 'Adult', 'Senior']; // Sunt doar exemple, pune valorile dorite
    } else if (animalType === 'Cat') {
      return ['Kitten', 'Young', 'Adult', 'Senior']; // Sunt doar exemple, pune valorile dorite
    }
    else return ['Young', 'Adult', 'Senior'];
  }

  getSizeOptions(animalType: string): string[] {
    if (animalType === 'Dog') {
      return ['Small (0-25 ibs)', 'Medium (26-60 ibs)', 'Large (61-100) ibs', 'Extra Large (101 ibs or more)']; // Sunt doar exemple, pune valorile dorite
    } else if (animalType === 'Cat') {
      return ['Small (0-6 ibs)', 'Medium (7-11 ibs)', 'Large (12-17) ibs', 'Extra Large (18 ibs or more)'];
    }
    return ['Small=', 'Medium', 'Large', 'Extra Large'];
  }

  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public animal: any, private sanitizer: DomSanitizer)
  {}

  save() {
    this.dialogRef.close(this.editData);
  }
}
