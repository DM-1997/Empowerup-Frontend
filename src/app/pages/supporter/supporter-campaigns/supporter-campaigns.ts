import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, map, switchMap } from 'rxjs';

import { CampaignService } from '../../../core/services/campaign.service';

@Component({
  selector: 'app-supporter-campaigns',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './supporter-campaigns.html',
  styleUrl: './supporter-campaigns.css'
})
export class SupporterCampaigns {

  private readonly IMAGE_URL = 'http://localhost:8080/uploads/';

  private refresh$ = new BehaviorSubject<void>(undefined);

  // Modal Detalhes
  modalDetalhes = false;

  // Modal Apoio
  modalApoio = false;

  campanhaSelecionada: any = null;

  valor = 0;

  paymentMethod = 'PAYPAY';

  campanhas$ = this.refresh$.pipe(

    switchMap(() =>
      this.campaignService.getActiveCampaigns()
    ),

    map((data: any[]) =>
  data.map(campanha => {


    const meta =
      campanha.valorAlvo || 0;


    const arrecadado =
      campanha.valorArrecadado || 0;



    return {


      ...campanha,


      // imagem
      imageUrl:
        campanha.imagemUrl ||
        'https://picsum.photos/700/450',



      // valores reais
      meta: meta,


      arrecadado: arrecadado,



      // percentual
      percentual: meta > 0

        ? Math.round(
            (arrecadado / meta) * 100
          )

        : 0,



      // valor que falta
      restante:

        meta - arrecadado



    };


  })
)

  );

  constructor(
    private campaignService: CampaignService
  ) {}

  /**
   * Abre modal de detalhes
   */
  detalhes(campanha: any): void {

    this.campanhaSelecionada = campanha;

    this.modalDetalhes = true;

  }

  fecharModalDetalhes(): void {

    this.modalDetalhes = false;

    this.campanhaSelecionada = null;

  }

  /**
   * Abre modal de apoio
   */
  apoiar(campanha: any): void {

    this.campanhaSelecionada = campanha;

    this.valor = 0;

    this.paymentMethod = 'PAYPAY';

    this.modalApoio = true;

  }

  fecharModalApoio(): void {

    this.modalApoio = false;

  }

  /**
   * Confirmar apoio
   */
  confirmarApoio(): void {

    if (this.valor <= 0) {

      return;

    }

    this.campaignService
      .supportCampaign(
        this.campanhaSelecionada.id,
        this.valor,
        this.paymentMethod
      )
      .subscribe({

        next: () => {

          // Fecha o modal
          this.modalApoio = false;

          // Atualiza lista
          this.refresh();

        },

        error: err => {

          console.error(err);

        }

      });

  }

  /**
   * Atualizar campanhas
   */
  refresh(): void {

    this.refresh$.next();

  }

  trackById(index: number, item: any): number {

    return item.id;

  }

}