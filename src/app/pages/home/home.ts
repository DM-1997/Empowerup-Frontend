import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { CampaignService } from '../../core/services/campaign.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private refresh$ = new BehaviorSubject<void>(undefined);

  campaigns$ = this.refresh$.pipe(
    switchMap(() => this.campaignService.getActiveCampaigns())
  );

  constructor(private campaignService: CampaignService) {}

  reload(): void {
    this.refresh$.next();
  }
}