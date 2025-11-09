import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatCard, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatFormFieldControl, MatLabel } from "@angular/material/form-field";
import { NgModel } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [MatCard, MatFormField, MatCardTitle, MatLabel, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  errorMessage = '';
  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.loading = true;
    this.errorMessage = '';
alert(this.username)
    if (this.auth.login(this.username, this.password)) {
      alert('log')
      this.router.navigate(['']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }

    this.loading = false;
  }
}
