import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdminDashboardStats {
  totalUsers: number;
  totalCampaigns: number;
  totalRaised: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private baseUrl = 'http://localhost:8080/api/admin/dashboard';

  constructor(private http: HttpClient) {}

  getStats(): Observable<AdminDashboardStats> {
    return this.http.get<AdminDashboardStats>(this.baseUrl);
  }
}