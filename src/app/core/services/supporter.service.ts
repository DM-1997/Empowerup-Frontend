import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SupporterService {


  private apiUrl =
    'http://localhost:8080/api/supporters';


  constructor(
    private http: HttpClient
  ) {}



  // 📷 Alterar foto do apoiador
  updateAvatar(
    supporterId:number,
    foto:File
  ):Observable<any>{


    const formData = new FormData();


    formData.append(
      'foto',
      foto
    );


    return this.http.put<any>(

      `${this.apiUrl}/${supporterId}/avatar`,

      formData

    );

  }


}