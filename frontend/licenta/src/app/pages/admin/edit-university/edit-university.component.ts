import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import {MapDialogComponent} from "../../../components/map-dialog/map-dialog.component";
import {countries} from "../../../utils/country-data-store";

@Component({
  selector: 'app-edit-university',
  templateUrl: './edit-university.component.html',
  styleUrls: ['./edit-university.component.css']
})
export class EditUniversityComponent {

  editData = {
    name: this.university.name,
    city: this.university.city,
    country: this.university.country,
    longitude: this.university.longitude,
    latitude: this.university.latitude,
    contact: this.university.contact
  };

  public countries:any = countries;

  constructor(
    public dialogRef: MatDialogRef<MapDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public university: any, private sanitizer: DomSanitizer)
  {}

  save() {
    this.dialogRef.close(this.editData);
  }
}
