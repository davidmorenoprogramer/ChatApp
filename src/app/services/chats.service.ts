import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, updateDoc,query, collectionData, DocumentData ,docData ,addDoc} from '@angular/fire/firestore';
import { Observable, from, of,take,concatMap } from 'rxjs';
import { switchMap,map } from 'rxjs/operators';
import { ProfileUser } from '../models/user-profile';
@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private firestore: Firestore,private userService:UserService) { }

  
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
