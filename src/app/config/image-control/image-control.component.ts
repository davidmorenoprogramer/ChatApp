
import { Component, computed, Input, inject,signal, Output, EventEmitter, effect } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter,take } from 'rxjs';
import { DialogCropImageComponent } from 'src/app/dialog/dialog-crop-image/dialog-crop-image.component';
import { PhotoService } from 'src/app/services/photo.service';
import { UserService } from 'src/app/services/user.service';
import{Storage} from '@angular/fire/storage'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
@Component({
  selector: 'app-image-control',
  templateUrl: './image-control.component.html',
  styleUrls: ['./image-control.component.css'],
 
})
export class ImageControlComponent {
  imageWidth = signal(0)
  @Input() set width(val:number){
    this.imageWidth.set(val);
  }

  imageHeight = signal(0)
  @Input() set height(val:number){
    this.imageHeight.set(val);
  }

  @Output() imageReady = new EventEmitter<string>();
  constructor(private userService: UserService, private photoService: PhotoService){
    effect(()=>{
      if (this.cropperImageUrl()){
        this.imageReady.emit(this.cropperImageUrl())
      }
    })
  }
  placeholder = computed(()=>`https://placehold.co/${this.imageWidth()}x${this.imageHeight()}`);

  resultBlob : any
  dialog = inject(MatDialog)
  cropperImageUrl = signal<string | undefined>(undefined)

  imagePath = signal('');
  @Input ({required:true}) set path(val:string){
    this.imagePath.set(val)
  }

  
  imageSource = computed(() => {return this.cropperImageUrl() ?? this.placeholder();})

  resetFileInput(input: HTMLInputElement) {
    input.value = ''; // Limpiar el valor del input de archivo
  }

  storage = inject(Storage)

  async uploadImage(blob:Blob){

    this.photoService.uploadImage(blob,this.imagePath())
    const downloadUrl: string = await this.photoService.downloadUrl(this.imagePath())
    this.cropperImageUrl.set(downloadUrl)
    
  }


  saveProfile(){
    if(this.resultBlob){
      this.uploadImage(this.resultBlob)
      
        
    }

  }
  fileSelected(event:any){
    
    const file = event.target.files[0]
    if (file){
      const dialogRef = this.dialog.open(DialogCropImageComponent,{
        data:{image:file,width:this.imageWidth(),height:this.imageHeight()},
        width:'500px',
        
      });

      dialogRef.afterClosed().pipe(filter(result => !!result)).subscribe((result)=>{
        this.resultBlob = result.blob
       
      })


    } 
  }
}
