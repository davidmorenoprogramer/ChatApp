import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import {routes} from "./app-router.module"


export const appConfig: ApplicationConfig = {
    providers:[provideRouter(routes)]
};