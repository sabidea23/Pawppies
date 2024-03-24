import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import {MapDialogComponent} from "../../utils/map-dialog/map-dialog.component";
import {countries} from "../../utils/country-data-store";

@Component({
  selector: 'app-edit-animal-center',
  templateUrl: './edit-animal-center.component.html',
  styleUrls: ['./edit-animal-center.component.css']
})
export class EditAnimalCenterComponent {

  editData = {
    name: this.animalCenter.name,
    city: this.animalCenter.city,
    country: this.animalCenter.country,
    longitude: this.animalCenter.longitude,
    latitude: this.animalCenter.latitude,
    contact: this.animalCenter.contact,
    phone: this.animalCenter.phone,
    mission: this.animalCenter.mission
  };

  public countries:any = countries;

  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public animalCenter: any)
  {}

  save() {
    this.dialogRef.close(this.editData);
  }
}
