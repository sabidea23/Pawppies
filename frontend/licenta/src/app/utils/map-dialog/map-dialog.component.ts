import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-map-dialog', templateUrl: './map-dialog.component.html', styleUrls: ['./map-dialog.component.css']
})
export class MapDialogComponent {

  constructor(public dialogRef: MatDialogRef<MapDialogComponent>, @Inject(MAT_DIALOG_DATA) public animalCenter: any, private sanitizer: DomSanitizer) {
  }

  getSafeUrl() {
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${this.animalCenter.longitude - 0.005},${this.animalCenter.latitude - 0.005},${this.animalCenter.longitude + 0.005},${this.animalCenter.latitude + 0.005}&layer=mapnik&marker=${this.animalCenter.latitude},${this.animalCenter.longitude}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
