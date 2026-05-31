import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/users';

  // 🔥 estado global do utilizador (login/logout reativo)
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

  // 🔐 GUARDAR USER APÓS LOGIN
  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user); // 🔥 atualiza UI automaticamente
  }

  // 🔐 OBTER USER LOGADO
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // 🔐 OBTER ID DO USER
  getUserId(): number | null {
    const user = this.getUser();
    return user ? user.id : null;
  }

  // 🔐 OBTER ROLE
  getUserRole(): string | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  // 🚪 LOGOUT
  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null); // 🔥 atualiza UI automaticamente
  }

  // 🔐 VERIFICAR SE ESTÁ LOGADO
  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}