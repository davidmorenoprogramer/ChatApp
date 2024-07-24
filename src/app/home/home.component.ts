import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  message: string = '';
  receivedMessages: string[] = ['Hello!', 'How are you?'];
  sentMessages: string[] = ['Hi!', 'I am good, thanks!'];
  
  user$ = this.userService.CurrentUserProfile$;
  users$ = this.userService.AllUsers$

  selectedContact: any = null;
  searchControl = new FormControl

  selectContact(contact: any) {
    this.selectedContact = contact;
    // Load messages for the selected contact
  }


  constructor(private userService:UserService,private router:Router){}
  Logout(){
    this.userService.logout().then(()=>{this.router.navigate(['/login'])})
  }
  sendMessage() {}
}

