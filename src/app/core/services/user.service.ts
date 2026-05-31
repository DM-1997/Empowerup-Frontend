import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // 👤 PERFIL DO USER LOGADO
  getMyProfile(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/me?userId=${userId}`);
  }

  // 🔥 ADMIN: LISTAR TODOS USERS
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/users`);
  }

  // 🔥 ADMIN: ELIMINAR USER
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/users/${id}`);
  }
}