import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private apiUrl = 'http://localhost:8080/api/campaigns';

  constructor(private http: HttpClient) {}

  // CREATE (multipart)
  createCampaign(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  // LIST
  getAllCampaigns(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMyCampaigns(userId: number) {
  return this.http.get<any[]>(
    `${this.apiUrl}/my?userId=${userId}`
  );
}

  // ✏️ UPDATE
  updateCampaign(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // 🗑 DELETE
  deleteCampaign(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 🔥 CAMPANHAS ATIVAS (PROJETOS EM DESTAQUE)
getActiveCampaigns(): Observable<any[]> {
  return this.http.get<any[]>(
    `${this.apiUrl}/active`
  );
}

supportCampaign(id: number, valor: number): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/${id}/support?valor=${valor}`,
    {}
  );
}
}