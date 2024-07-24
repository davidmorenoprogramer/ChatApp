import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from './auth/register/register/register.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
  styleUrls: ['./app.component.css'],
  
})

export class AppComponent {
  title = 'chatApp';
  constructor(private dialogRegistro: MatDialog){}
  openPopupRegistro(){
    this.dialogRegistro.open(RegisterComponent)
  }
}
