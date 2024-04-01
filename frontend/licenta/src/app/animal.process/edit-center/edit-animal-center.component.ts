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

  public openingHours: any = {
    mondayOpen: this.animalCenter.openingHours.mondayOpen,
    mondayClose: this.animalCenter.openingHours.mondayClose,
    wednesdayOpen: this.animalCenter.openingHours.wednesdayOpen,
    wednesdayClose: this.animalCenter.openingHours.wednesdayClose,
    thursdayOpen: this.animalCenter.openingHours.thursdayOpen,
    thursdayClose: this.animalCenter.openingHours.thursdayClose,
    fridayOpen: this.animalCenter.openingHours.fridayOpen,
    fridayClose: this.animalCenter.openingHours.fridayClose,
    tuesdayOpen: this.animalCenter.openingHours.tuesdayOpen,
    tuesdayClose: this.animalCenter.openingHours.tuesdayClose,
    saturdayOpen: this.animalCenter.openingHours.saturdayOpen,
    saturdayClose: this.animalCenter.openingHours.saturdayClose,
    sundayOpen: this.animalCenter.openingHours.sundayOpen,
    sundayClose: this.animalCenter.openingHours.sundayClose,
  }
  public countries:any = countries;

  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public animalCenter: any)
  {}

  save() {
    this.dialogRef.close(this.editData);
  }
}
