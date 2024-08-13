import { Injectable,inject} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import{Storage} from '@angular/fire/storage'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { filter,take } from 'rxjs';
import { ProfileUser } from '../models/user-profile';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {
 
  constructor(private userService: UserService) { }
  storage = inject(Storage)

  async uploadImage(blob:Blob,imagePath:string){

    const storageRef = ref(this.storage,imagePath);
    return await uploadBytes(storageRef,blob)

  }
  

  async withoutPhoto(userId:string){
    try {

      const imagePath = "assets/user.png";
      const response = await fetch(imagePath);  
      const blob = await response.blob();  
      const uploadPath = "/perfilImages/" + userId;
      const storageRef = ref(this.storage, uploadPath);
      const uploadTask = await uploadBytes(storageRef, blob);  
      const downloadUrl = await getDownloadURL(uploadTask.ref);  
  
      await this.ActualUserUpdatePhoto(downloadUrl);  
    } catch (error) {
      console.error('Error:', error); 
    }

  }
  

  async downloadUrl(imagePath:string):Promise<string>{
    const storageRef = ref(this.storage,imagePath);
    const promiseDowload = await getDownloadURL(storageRef)
    return promiseDowload
  }

  ActualUserUpdatePhoto(imagen:string){
    this.userService.CurrentUserProfile$.pipe(
      take(1) // Toma solo un valor del observable y luego completa
    ).subscribe((UsuarioActual: ProfileUser | null) => {
      if (UsuarioActual) {
        UsuarioActual.photoUrl = imagen
        this.userService.UpdateUser(UsuarioActual);
      }});
  }
}
