import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, switchMap } from 'rxjs';
import { AdminCampaignService } from '../../../core/services/adminCampaign.service';

@Component({
  selector: 'app-admin-campaigns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-campaigns.html',
  styleUrl: './admin-campaigns.css'
})
export class AdminCampaigns {

  private refresh$ = new BehaviorSubject<void>(undefined);

  campaigns$ = this.refresh$.pipe(
    switchMap(() => this.adminCampaignService.getAllCampaigns())
  );

  modalAberto = false;

  campanhaSelecionada: any = {};

  constructor(
    private adminCampaignService: AdminCampaignService
  ) {}

  abrirDetalhes(campanha: any): void {

    console.log('Campanha selecionada:', campanha);
    console.log('Video URL:', campanha.videoUrl);

    // Caso o backend devolva apenas o nome do ficheiro,
    // descomente as linhas abaixo.

    /*
    if (
      campanha.videoUrl &&
      !campanha.videoUrl.startsWith('http')
    ) {
      campanha.videoUrl =
        'http://localhost:8080/uploads/' + campanha.videoUrl;
    }
    */

    this.campanhaSelecionada = { ...campanha };

    this.modalAberto = true;
  }

  fecharModal(): void {

    this.modalAberto = false;

    this.campanhaSelecionada = {};
  }

  approveCampaign(id: number): void {

    this.adminCampaignService.approveCampaign(id).subscribe({

      next: () => {

        this.refresh$.next();

        if (this.modalAberto) {
          this.fecharModal();
        }

      },

      error: err => console.error(err)

    });

  }

  deleteCampaign(id: number): void {

    if (!confirm('Deseja eliminar esta campanha?')) {
      return;
    }

    this.adminCampaignService.deleteCampaign(id).subscribe({

      next: () => {

        this.refresh$.next();

        if (
          this.campanhaSelecionada &&
          this.campanhaSelecionada.id === id
        ) {
          this.fecharModal();
        }

      },

      error: err => console.error(err)

    });

  }

}