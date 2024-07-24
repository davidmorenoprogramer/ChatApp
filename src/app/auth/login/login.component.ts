import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  formLogin:FormGroup;

  constructor(private userService:UserService, private router: Router){
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }
  ngOnInit(): void {
    
  }
  onSubmit(){
    console.log(this.formLogin.value)
    this.userService.login(this.formLogin.value)
    .then(response => {this.router.navigate(['/home'])})
    .catch(error =>{console.log(error)})
    

  }
  goToRegister(){this.router.navigate(['/register'])}
}
