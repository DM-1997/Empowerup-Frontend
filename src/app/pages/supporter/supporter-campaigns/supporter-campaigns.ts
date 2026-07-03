import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, switchMap, map } from 'rxjs';

import { CampaignService } from '../../../core/services/campaign.service';

@Component({
  selector: 'app-supporter-campaigns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supporter-campaigns.html',
  styleUrl: './supporter-campaigns.css',
})
export class SupporterCampaigns {

  private refresh$ = new BehaviorSubject<void>(undefined);

  modalAberto = false;
  campanhaSelecionada: any = null;

  private readonly IMAGE_URL = 'http://localhost:8080/uploads/';

  campanhas$ = this.refresh$.pipe(
    switchMap(() =>
      this.campaignService.getActiveCampaigns()
    ),
    map((data: any[]) =>
      data.map(campanha => {

        const meta = campanha.meta || 0;
        const arrecadado = campanha.arrecadado || 0;

        return {
          ...campanha,

          // 🔥 IMAGEM CORRIGIDA
          imageUrl:
            campanha.imagemUrl ||
            (campanha.imagem
              ? this.IMAGE_URL + campanha.imagem
              : 'https://picsum.photos/700/450'),

          // 🔥 PERFORMANCE
          percentual: meta ? Math.round((arrecadado / meta) * 100) : 0,
          restante: meta - arrecadado
        };
      })
    )
  );

  constructor(
    private campaignService: CampaignService,
    private router: Router
  ) {}

  apoiar(campanha: any): void {
    this.router.navigate(['/campanhas', campanha.id, 'apoiar']);
  }

  detalhes(campanha: any): void {
    this.campanhaSelecionada = campanha;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.campanhaSelecionada = null;
  }

  refresh(): void {
    this.refresh$.next();
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}