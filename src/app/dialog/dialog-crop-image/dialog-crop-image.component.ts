import { Component, inject,signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';

export type CropperDialogData = {
  image:File;
  width:number;
  height:number;
}

export type CropperDialogResult ={
  blob:Blob;
  imageUrl:string;
}

@Component({
  selector: 'app-dialog-crop-image',
  templateUrl: './dialog-crop-image.component.html',
  styleUrls: ['./dialog-crop-image.component.css'],
  standalone:true,
  imports:[MatDialogModule,ImageCropperComponent],
})

export class DialogCropImageComponent {
  data: CropperDialogData = inject(MAT_DIALOG_DATA)
  result = signal<CropperDialogResult | undefined>(undefined);

  imageChangedEvent: Event | null = null;
  constructor(private sanitizer: DomSanitizer){}

  imageCropped(event: ImageCroppedEvent){
  
  const {blob,objectUrl} = event;
  if(blob && objectUrl){
    this.result.set({blob,imageUrl:objectUrl});
  }
}
fileChangeEvent(event: Event): void {
  this.imageChangedEvent = event;
}

}
