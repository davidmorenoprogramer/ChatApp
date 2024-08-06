import { Component ,ViewEncapsulation ,AfterViewChecked, OnInit,ViewChild  } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { combineLatest,catchError, concatMap, map, Observable, switchMap, tap, of,take } from 'rxjs';
import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { ProfileUser } from '../models/user-profile';
import { ChatsService } from '../services/chats.service';
import { Message } from '../models/chat';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent   {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  user$ = this.userService.CurrentUserProfile$;
  users$ = this.userService.AllUsers$
  myChats$ = this.chatService.myChats$
  chatListControl = new FormControl()
  searchControl = new FormControl('')
  messageControl = new FormControl('')
 


  
  messages$ = this.chatListControl.valueChanges.pipe(map(value => value[0])
,switchMap(chatId => this.chatService.getChatsMessages$(chatId)),tap(()=>{this.scrollToBottom()}))
 
 
selectedChat$ = combineLatest([
  this.chatListControl.valueChanges,
  this.myChats$
]).pipe(map(([value,chats]) => chats.find((c) => c.id === value[0])),tap(()=>{this.scrollToBottom()}),)
 

  constructor(private el: ElementRef, private renderer: Renderer2, private chatService: ChatsService, private userService:UserService,private router:Router){}
  Logout(){
    this.userService.logout().then(()=>{this.router.navigate(['/login'])})
  }

 
  createChat(otherUser:ProfileUser){
    this.chatService.createNewChat(otherUser).subscribe();
    
  }
  scrollToBottom(): void {
    
    setTimeout(() => {
      const container = this.chatContainer.nativeElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 0);
  }
  
  sendMessage(){
    const message = this.messageControl.value;
    const selectedChatId = this.chatListControl.value[0]

    if (message && selectedChatId){
      
      this.chatService.addChatMessage(selectedChatId,message).subscribe()
      this.messageControl.setValue('');
      
    }

    
  }
}

