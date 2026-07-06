import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contribution {
  id: number;
  campaign: string;
  amount: number;
  contributionDate: string;
  paymentMethod: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContributionService {

  private api = 'http://localhost:8080/api/contributions';

  constructor(private http: HttpClient) {}

  findBySupporter(supporterId: number): Observable<Contribution[]> {

    if (!supporterId) {
      throw new Error('Supporter ID inválido');
    }

    return this.http.get<Contribution[]>(
      `${this.api}/supporter/${supporterId}`
    );
  }
}