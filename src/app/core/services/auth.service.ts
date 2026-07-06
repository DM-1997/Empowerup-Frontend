import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/users';

  private userSubject = new BehaviorSubject<any>(this.getUser());
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  // 🔵 LOGIN
  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  // 🔐 REGISTO
  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // 🔐 GUARDA USER
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  // 🔐 GET USER
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // 🔐 ID (ROBUSTO)
  getUserId(): number | null {
    const user = this.getUser();

    console.log('USER FROM STORAGE:', user);

    return user?.id ?? user?.user?.id ?? user?.data?.id ?? null;
  }

  // 🔐 ROLE
  getUserRole(): string | null {
    const user = this.getUser();
    return user?.role ?? null;
  }

  // 🚪 LOGOUT
  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  // 🔐 LOGIN STATUS
  isLoggedIn(): boolean {
    const user = this.getUser();
    return user !== null && user.active === true;
  }

  // 🔐 ACTIVE CHECK
  isActiveUser(): boolean {
    const user = this.getUser();
    return user?.active === true;
  }

  validateSession() {
    const user = this.getUser();

    if (user && user.active === false) {
      this.logout();
      return false;
    }

    return true;
  }
}