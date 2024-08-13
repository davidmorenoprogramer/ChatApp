import { computeMsgId } from '@angular/compiler';
import { Component, computed, Input, signal } from '@angular/core';
import { ImageControlComponent } from '../image-control/image-control.component';
import { UserService } from 'src/app/services/user.service';
import { take } from 'rxjs';
import { ProfileUser } from 'src/app/models/user-profile';
import { PhotoService } from 'src/app/services/photo.service';
@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {

  imageWidth = signal(0)
  @Input() set width(val:number){
    this.imageWidth.set(val);
  }

  imageHeight = signal(0)
  @Input() height(val:number){
    this.imageHeight.set(val);
  }
  constructor(private userService: UserService, private photoService: PhotoService){}
  uid_actual_user:string | undefined = "";

  user$ = this.userService.CurrentUserProfile$.subscribe(value => {
    this.uid_actual_user = value?.uid;
  })

  placeholder = computed(()=>`https://pacehold.co/${this.imageWidth()}x${this.imageHeight()}`)

  imageReady(ImageUrl:string){
    if (this.userService.CurrentUserProfile$)

      this.photoService.ActualUserUpdatePhoto(ImageUrl)

  }
}
