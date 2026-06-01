import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminCampaignService {

  private baseUrl = 'http://localhost:8080/api/admin/campaigns';

  constructor(private http: HttpClient) {}

  getAllCampaigns(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  approveCampaign(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/approve`, {});
  }

  cancelCampaign(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/cancel`, {});
  }

  deleteCampaign(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}