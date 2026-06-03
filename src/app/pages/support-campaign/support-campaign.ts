import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CampaignService } from '../../core/services/campaign.service';

@Component({
  selector: 'app-support-campaign',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support-campaign.html',
  styleUrl: './support-campaign.css',
})
export class SupportCampaign implements OnInit {

  campaign: any;
  valor: number = 0;

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.loadCampaign(id);
  }

  loadCampaign(id: number) {
    this.campaignService.getAllCampaigns()
      .subscribe(data => {
        this.campaign = data.find(c => c.id === id);
      });
  }

  apoiar(): void {
    if (!this.campaign || this.valor <= 0) return;

    this.campaignService.supportCampaign(this.campaign.id, this.valor)
      .subscribe(updated => {
        this.campaign = updated;
        this.valor = 0;
      });
  }
}