import { Injectable } from '@angular/core';
import {Review} from "../model/review.model";
import {FileModel} from "../model/file-handle.model";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }
  public createImage (review: any) {
    const reviewImages: any[] =  review.reviewImages;

    const reviewimagesToFileHandle: FileModel[] = [];

    for (let i = 0; i < reviewImages.length; i++) {
      const imageFileData = reviewImages[i];

      const imageBlob = this.dataURIToBlob(imageFileData.picByte, imageFileData.type);

      const imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type});

      const finalFileHandle: FileModel = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      reviewimagesToFileHandle.push(finalFileHandle);
    }

    review.reviewImages = reviewimagesToFileHandle;
    return review;
  }

  public dataURIToBlob(pictureBytes : any, imageType: any) {
    const byteString = window.atob(pictureBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([int8Array], {type: imageType});
  }
}
