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

  // 🔵 REGISTO
  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  // 🔵 LOGIN
  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  // 🔐 SET USER
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  // 🔐 GET USER
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // 🔐 ID
  getUserId(): number | null {
    const user = this.getUser();
    return user ? user.id : null;
  }

  // 🔐 ROLE
  getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  // 🚪 LOGOUT
  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  // 🔐 LOGIN STATUS (COM ACTIVE CHECK)
  isLoggedIn(): boolean {
    const user = this.getUser();
    return user !== null && user.active === true;
  }

  // 🚨 VERIFICAR SE USER AINDA ESTÁ ATIVO
  isActiveUser(): boolean {
    const user = this.getUser();
    return user?.active === true;
  }

  // 🔥 FUNÇÃO IMPORTANTE: FORÇAR LOGOUT SE INATIVO
  validateSession() {
    const user = this.getUser();

    if (user && user.active === false) {
      this.logout();
      return false;
    }

    return true;
  }
}