import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
 
  formReg:FormGroup;

  constructor(private userService:UserService, private router: Router){
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
      switchMap(({user:{uid}}) => this.userService.addNewUser({uid,email,displayName: name}))

    )
    .subscribe({next:(result)=> {this.router.navigate(['/home'])}})
    
      
   
    

  }
  goToLogin(){this.router.navigate(['/login'])}

  



}
