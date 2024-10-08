import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Auth,provideAuth,getAuth } from '@angular/fire/auth';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-router.module';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './auth/register/register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { DateDisplayPipe } from './pipes/date-display.pipe';
import { DatePipe } from '@angular/common';
import { ConfigComponent } from './config/config/config.component';
import { ImageControlComponent } from './config/image-control/image-control.component';
import { DialogCropImageComponent } from './dialog/dialog-crop-image/dialog-crop-image.component';
import { provideStorage,Storage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';

@NgModule({
  declarations: [
    AppComponent,RegisterComponent, HomeComponent, LoginComponent, DateDisplayPipe, ConfigComponent, ImageControlComponent,
  ],
  imports: [
    BrowserModule,MatDividerModule,AngularFireModule,MatCardModule,MatButtonModule,AngularFirestoreModule,MatAutocompleteModule,BrowserAnimationsModule,MatMenuModule,MatListModule,MatIconModule,MatFormFieldModule,MatInputModule,MatToolbarModule,ReactiveFormsModule,FormsModule,MatDialogModule,AppRoutingModule,
    provideFirebaseApp(()=>initializeApp(environment.firebase)),
    provideAuth(()=>getAuth()),
    AngularFireModule.initializeApp(environment.firebase),
    provideFirestore(()=>getFirestore()),
    provideStorage(()=>getStorage())
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
