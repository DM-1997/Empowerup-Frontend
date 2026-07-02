import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CampaignService } from '../../../core/services/campaign.service';

@Component({
  selector: 'app-supporter-campaigns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supporter-campaigns.html',
  styleUrl: './supporter-campaigns.css',
})
export class SupporterCampaigns implements OnInit {

  campanhas: any[] = [];
  carregando = true;

  // ================= MODAL =================
  modalAberto = false;
  campanhaSelecionada: any = null;

  // =========================================
  private readonly IMAGE_URL = 'http://localhost:8080/uploads/';

  constructor(
    private campaignService: CampaignService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.listarCampanhas();
  }

  // ================= LISTAR CAMPANHAS =================

  listarCampanhas(): void {
    this.carregando = true;

    this.campaignService.getActiveCampaigns().subscribe({
      next: (data) => {

        this.campanhas = data.map((campanha: any) => {

          const meta = campanha.meta || 0;
          const arrecadado = campanha.arrecadado || 0;

          return {
            ...campanha,

            // imagem otimizada
            imageUrl:
              campanha.imagemUrl ||
              (campanha.imagem
                ? this.IMAGE_URL + campanha.imagem
                : 'https://picsum.photos/700/450'),

            // ================= PERFORMANCE =================
            percentual: meta ? Math.round((arrecadado / meta) * 100) : 0,
            restante: meta - arrecadado
          };
        });

        this.carregando = false;
      },

      error: (err) => {
        console.error('Erro ao carregar campanhas:', err);
        this.carregando = false;
      }
    });
  }

  // ================= APOIAR =================

  apoiar(campanha: any): void {
    this.router.navigate([
      '/campanhas',
      campanha.id,
      'apoiar'
    ]);
  }

  // ================= MODAL =================

  detalhes(campanha: any): void {
    this.campanhaSelecionada = campanha;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.campanhaSelecionada = null;
  }

  // ================= TRACK BY (IMPORTANTE) =================

  trackById(index: number, item: any): number {
    return item.id;
  }
}