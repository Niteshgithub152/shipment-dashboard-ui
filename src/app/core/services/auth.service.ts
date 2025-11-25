import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean | undefined;
  constructor(private httpService: HttpService, private router: Router) { }

  login(username: string, password: string): any {
    return this.httpService.login({userId: username, password: password});
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  get loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
