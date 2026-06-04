import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, switchMap } from 'rxjs';
import { CampaignService } from '../../core/services/campaign.service';

@Component({
  selector: 'app-support-campaign',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support-campaign.html',
  styleUrl: './support-campaign.css',
})
export class SupportCampaign {

  valor: number = 0;
  paymentMethod: string = 'PAYPAY';

  private campaignId: number;
  private refresh$ = new BehaviorSubject<void>(undefined);

  // 🔥 CORRETO: busca apenas a campanha atual
  campaign$ = this.refresh$.pipe(
    switchMap(() =>
      this.campaignService.getCampaignById(this.campaignId)
    )
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService
  ) {
    this.campaignId = Number(
      this.route.snapshot.paramMap.get('id')
    );
  }

  apoiar(): void {

  if (this.valor <= 0) return;

  this.campaignService
    .supportCampaign(this.campaignId, this.valor, this.paymentMethod)
    .subscribe({
      next: () => {

        this.valor = 0;

        // 🔥 FORÇA reload direto (sem BehaviorSubject)
        this.campaign$ = this.campaignService.getCampaignById(this.campaignId);
      },
      error: err => console.error(err)
    });
}
  voltar(): void {
    this.router.navigate(['/']);
  }
}