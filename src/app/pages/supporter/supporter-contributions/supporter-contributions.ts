import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, switchMap, map } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ContributionService, Contribution } from '../../../core/services/contribution.service';

@Component({
  selector: 'app-supporter-contributions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supporter-contributions.html',
  styleUrl: './supporter-contributions.css',
})
export class SupporterContributions {

  // 🔥 trigger de reload (igual ao teu MyCampaigns)
  private refresh$ = new BehaviorSubject<void>(undefined);

  // 🔥 stream principal
  contribuicoes$ = this.refresh$.pipe(
    switchMap(() => {
      const supporterId = this.authService.getUserId();
      return this.contributionService.findBySupporter(supporterId!);
    })
  );

  // 🔥 stats reativas
  totalContribuicoes$ = this.contribuicoes$.pipe(
    map(list => list.length)
  );

  totalInvestido$ = this.contribuicoes$.pipe(
    map(list =>
      list.reduce((t, c) => t + Number(c.amount), 0)
    )
  );

  totalCampanhas$ = this.contribuicoes$.pipe(
    map(list =>
      new Set(list.map(c => c.campaign)).size
    )
  );

  constructor(
    private contributionService: ContributionService,
    private authService: AuthService
  ) {}

  // 🔥 reload manual (caso precises no futuro)
  reload() {
    this.refresh$.next();
  }
}