import { computeMsgId } from '@angular/compiler';
import { Component, computed, Input, signal } from '@angular/core';
import { ImageControlComponent } from '../image-control/image-control.component';
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

  placeholder = computed(()=>`https://pacehold.co/${this.imageWidth()}x${this.imageHeight()}`)

  imageReady(ImageUrl:string){

  }
}
