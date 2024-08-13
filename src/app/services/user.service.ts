import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, doc, setDoc, updateDoc,query, collectionData, DocumentData ,docData } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { switchMap,map } from 'rxjs/operators';
import { ProfileUser } from '../models/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser$ = authState(this.auth)
  
  constructor(private auth: Auth, private firestore:Firestore) { 
   
  }


  get CurrentUserProfile$(): Observable<ProfileUser|null> {
    
    return this.currentUser$.pipe(
      switchMap(user=>{
        if(!user?.uid){ //si el usuario no coincide, devuelve nulo
          return of(null);
        }
        //si coincide, devuelve los datos del usuario
        const ref = doc(this.firestore,'users' , user?.uid);
        
        
        return docData(ref) as Observable<ProfileUser>
      })
    )

  }
  

  get AllUsers$(): Observable<ProfileUser[]> {
    
    return this.CurrentUserProfile$.pipe(
      switchMap(currentUser => {
        if (!currentUser) {
          return of([]);
        }

        const ref = collection(this.firestore, 'users');
        const queryAll = query(ref);

        return collectionData(queryAll, { idField: 'uid' }).pipe(
          map((data: DocumentData[]) => {
            // Asegúrate de que el tipo sea ProfileUser
            const users: ProfileUser[] = data.map((item: any) => ({
              uid: item.uid,
              displayName: item.displayName
              // Agrega otros campos si es necesario
            }));

            return users.filter(user => user.uid !== currentUser.uid);
          })
        );
      })
    );
  }
  

  register(name:string,email:string, password:string){

    return from(createUserWithEmailAndPassword(this.auth, email, password))
    
      /*return createUserWithEmailAndPassword(this.auth,email,password)*/
  }

  addNewUser(user:ProfileUser):Observable<any>{
    const ref = doc(this.firestore,'users', user?.uid);
    return from(setDoc(ref,user));
  }

  UpdateUser(user:ProfileUser):Observable<any>{
    const ref = doc(this.firestore,'users', user?.uid);
    return from(updateDoc(ref,{...user}));
  }


  login({email, password}:any){
    return signInWithEmailAndPassword(this.auth,email,password);
  }

  logout(){
      return signOut(this.auth)
  }
}
