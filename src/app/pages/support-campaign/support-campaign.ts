import { Component, OnInit } from '@angular/core';
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
export class SupportCampaign implements OnInit {

  valor = 0;
  paymentMethod = 'PAYPAY';

  private campaignId!: number;

  private refresh$ = new BehaviorSubject<void>(undefined);

  campaign$ = this.refresh$.pipe(
    switchMap(() =>
      this.campaignService.getCampaignById(this.campaignId)
    )
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {

    this.campaignId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    // Apenas para verificar se o vídeo está chegando
    this.campaign$.subscribe(campaign => {
      console.log('Campanha:', campaign);
      console.log('Vídeo:', campaign.videoUrl);
    });

  }

  apoiar(): void {

    if (this.valor <= 0) {
      return;
    }

    this.campaignService
      .supportCampaign(
        this.campaignId,
        this.valor,
        this.paymentMethod
      )
      .subscribe({
        next: () => {

          this.valor = 0;

          // Atualiza os dados da campanha
          this.refresh$.next();

          alert('Contribuição realizada com sucesso!');

        },
        error: err => console.error(err)
      });

  }

  voltar(): void {
    this.router.navigate(['/']);
  }

}