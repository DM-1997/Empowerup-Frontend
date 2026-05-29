import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, switchMap } from 'rxjs';
import { CampaignService } from '../../core/services/campaign.service';

@Component({
  selector: 'app-my-campaigns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-campaigns.html',
  styleUrls: ['./my-campaigns.css'],
})
export class MyCampaigns {

  private refresh$ = new BehaviorSubject<void>(undefined);

  campanhas$ = this.refresh$.pipe(
    switchMap(() => this.campaignService.getAllCampaigns())
  );

  mensagemSucesso: string | null = null;

  constructor(private campaignService: CampaignService) {}

  editar(id: number) {
    console.log('Editar:', id);
  }

  eliminar(id: number) {
    this.campaignService.deleteCampaign(id).subscribe({
      next: () => {

        // 🔥 força refresh REAL da lista
        this.refresh$.next();

        // 🔥 mensagem de sucesso
        this.mensagemSucesso = 'Campanha eliminada com sucesso!';

        setTimeout(() => {
          this.mensagemSucesso = null;
        }, 3000);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}