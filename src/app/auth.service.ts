import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean | undefined;
  constructor() { }

  login(username: string, password: string): boolean {
    // Basic mock logic (replace with real API call)
    if (username === 'admin' && password === 'admin123') {
      this.isLoggedIn = true;
      localStorage.setItem('token', 'mock-jwt-token');
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
  }

  get loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
