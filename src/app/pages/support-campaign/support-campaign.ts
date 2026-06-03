import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, switchMap, map } from 'rxjs';
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

  private campaignId: number;

  private refresh$ = new BehaviorSubject<void>(undefined);

  campaign$ = this.refresh$.pipe(
    switchMap(() =>
      this.campaignService.getAllCampaigns()
    ),
    map(campaigns =>
      campaigns.find(c => c.id === this.campaignId)
    )
  );

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService
  ) {
    this.campaignId = Number(
      this.route.snapshot.paramMap.get('id')
    );
  }

  apoiar(): void {

    if (this.valor <= 0) {
      return;
    }

    this.campaignService
      .supportCampaign(this.campaignId, this.valor)
      .subscribe({
        next: () => {

          this.valor = 0;

          // 🔥 recarrega os dados da campanha
          this.refresh$.next();
        },
        error: err => console.error(err)
      });
  }
}