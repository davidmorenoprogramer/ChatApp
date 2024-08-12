import { RouterModule, Routes } from "@angular/router";


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from "./auth/register/register/register.component";
import { Auth,provideAuth,getAuth } from '@angular/fire/auth';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LoginComponent } from "./auth/login/login.component";
import { HomeComponent } from "./home/home.component";
import { canActivate, redirectUnauthorizedTo } from "@angular/fire/auth-guard"; // para meter un guard
import { ConfigComponent } from "./config/config/config.component";

export const routes: Routes=[
    {
        /*path:'',loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)*/
        path:'', pathMatch: 'full', redirectTo: '/login'
    },
    {
        path:'register',
        component:RegisterComponent
    },
    
    {
        path:'login',
        component:LoginComponent},
    {
        path:'home'
        ,component:HomeComponent, 
        ...canActivate(()=> redirectUnauthorizedTo(['/login']))
        
        //si no está autorizado lo manda a login
    },
    {
         path:'home/config',
         component:ConfigComponent
    }
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule],
    providers: [],
    bootstrap: []
  })
  export class AppRoutingModule { }