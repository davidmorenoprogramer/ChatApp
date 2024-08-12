import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import {routes} from "./app-router.module"
import { provideStorage,getStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
    providers:[
        provideRouter(routes)]
};