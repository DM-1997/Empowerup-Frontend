import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private apiUrl = 'http://localhost:8080/api/campaigns';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAllCampaigns(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMyCampaigns(userId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/my?userId=${userId}`
    );
  }

  getActiveCampaigns(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/active`
    );
  }

  createCampaign(data: FormData): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateCampaign(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteCampaign(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ Apoiar campanha
  supportCampaign(
    id: number,
    valor: number,
    paymentMethod: string
  ): Observable<any> {

    const body = {
      supporterId: this.authService.getUserId(),
      valor: valor,
      paymentMethod: paymentMethod
    };

    return this.http.post(
      `${this.apiUrl}/${id}/support`,
      body
    );
  }

  // ✅ Confirmar pagamento
  confirmPayment(contributionId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/contributions/${contributionId}/confirm`,
      {}
    );
  }

  getCampaignById(id: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${id}?t=${Date.now()}`
    );
  }

}