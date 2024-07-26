import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';


import { Firestore, collection, where,doc, setDoc, updateDoc,query, collectionData, DocumentData ,docData ,addDoc} from '@angular/fire/firestore';
import { Observable, from, of,take,concatMap, } from 'rxjs';
import { switchMap,map } from 'rxjs/operators';
import { ProfileUser } from '../models/user-profile';
import { Chat } from '../models/chat';
@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private firestore: Firestore,private userService:UserService) { }

  
get myChats$(): Observable<Chat[]>{
  const ref = collection(this.firestore,'chats')
  //llama al user service y recupera el usuario para acceder a sus chats
  return this.userService.CurrentUserProfile$.pipe(
    concatMap((user)=> {
      const myQuery = query(ref,where('userIds','array-contains',user?.uid))
      return collectionData(myQuery, {idField:'id'}).pipe(map(chats => this.addChatNameAndPic(user?.uid ?? '',chats as Chat[]))) as Observable<Chat[]>
    })
  )
}
addChatNameAndPic(currentUserId:string,chats: Chat[]):Chat[]{
  chats.forEach(chat =>{
    const otherIndex = chat.userIds.indexOf(currentUserId)=== 0 ? 1 : 0 // determina en que posicion está el usuario actual.
    const {displayName} = chat.users[otherIndex];
    chat.chatName = displayName
  })
  return chats
}

createNewChat(otherUser:ProfileUser):Observable<string> {
    const ref = collection(this.firestore,'chats');
    return this.userService.CurrentUserProfile$.pipe(
      take(1),
      concatMap(user => addDoc(ref,{
        userIds:[user?.uid, otherUser.uid],
        users:[{displayName:user?.displayName ?? ''},{displayName:otherUser?.displayName ?? ''}]
      })),map(ref =>ref.id)
    )
  }
}
