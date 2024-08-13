import { Component, OnInit,inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { take } from 'rxjs';
import{Storage} from '@angular/fire/storage'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { PhotoService } from 'src/app/services/photo.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
 
  formReg:FormGroup;
  uid_actual_user:any
  imagen:any
  storage = inject(Storage)
  constructor(private userService:UserService, private router: Router, private photoService: PhotoService){
    this.formReg = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    })
  }
  ngOnInit(): void {
    
  }

  getName(){
    return this.formReg.controls['name'].value;
  }
  getEmail(){
    return this.formReg.controls['email'].value;
  }
  getPass(){
    return this.formReg.controls['password'].value;
  }
  onSubmit(){
    const name = this.getName();
    const email = this.getEmail();
    const password = this.getPass();
    
    this.userService.register(this.getName(),this.getEmail(),this.getPass())
    .pipe(
      switchMap(({user:{uid}}) => { 
        this.uid_actual_user = uid;
        return this.userService.addNewUser({uid,email,displayName: name})
      }
        ),
     
    )
    .subscribe({next:(result)=> {
      this.uploadImage(this.uid_actual_user)
      this.router.navigate(['/home'])
    
    }})
    
      
  }
  goToLogin(){
    
    this.router.navigate(['/login'])
  
  }

  uploadImage(uidUser:string){
    this.photoService.withoutPhoto(uidUser)
    
  }



}
