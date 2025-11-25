import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AppService } from '../core/services/app.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [FormsModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  errorMessage = '';
  constructor(private auth: AuthService, private appService: AppService, private router: Router) {}

  onLogin() {
    this.loading = true;
    this.errorMessage = '';
    this.auth.login(this.username, this.password).subscribe({
      next: (res: any) => {
        const token = res.token; // or wherever stored
        if (token) {
          localStorage.setItem('token', token);
          const decoded: any = jwtDecode(token);
          this.appService.user = decoded;
          this.auth.isLoggedIn = true;
          this.errorMessage = '';
          this.router.navigate(['/']);
        }
      },
      error: (e: any) => {
        this.errorMessage = 'Invalid Username or Password';
      }
    });
    this.loading = false;
  }
}
