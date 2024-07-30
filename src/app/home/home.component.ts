import { Component ,ViewEncapsulation , OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { combineLatest, concatMap, map, Observable, take } from 'rxjs';
import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ProfileUser } from '../models/user-profile';
import { ChatsService } from '../services/chats.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  message: string = '';
  receivedMessages: string[] = ['Hello!', 'How are you?'];
  sentMessages: string[] = ['Hi!', 'I am good, thanks!'];
  
  user$ = this.userService.CurrentUserProfile$;
  users$ = this.userService.AllUsers$
  myChats$ = this.chatService.myChats$
  chatListControl = new FormControl
  searchControl = new FormControl

  selectedChat$ = combineLatest([
    this.chatListControl.valueChanges,this.myChats$
  ]).pipe(map(([value,chats])=> chats.find((c) => c.id == value[0])))
 

  selectContact(contact: any) {
    //this.selectedChat = selectedChat;
    // Load messages for the selected contact
  }
  ngOnInit(): void {
    combineLatest([this.user$, this.users$])
  }

  constructor(private el: ElementRef, private renderer: Renderer2, private chatService: ChatsService, private userService:UserService,private router:Router){}
  Logout(){
    this.userService.logout().then(()=>{this.router.navigate(['/login'])})
  }

  sendprueba(){
    console.log("envia")
  }
  createChat(otherUser:ProfileUser){
    this.chatService.createNewChat(otherUser).subscribe();
  }
}

