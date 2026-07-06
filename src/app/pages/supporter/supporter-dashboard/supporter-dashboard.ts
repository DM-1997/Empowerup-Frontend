import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, switchMap, map } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ContributionService, Contribution } from '../../../core/services/contribution.service';

@Component({
  selector: 'app-supporter-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './supporter-dashboard.html',
  styleUrl: './supporter-dashboard.css',
})
export class SupporterDashboard {

  nome = '';

  private refresh$ = new BehaviorSubject<void>(undefined);

  // 🔥 STREAM PRINCIPAL
  contributions$ = this.refresh$.pipe(
    switchMap(() => {
      const userId = this.authService.getUserId();
      return this.contributionService.findBySupporter(userId!);
    })
  );

  // 🔥 TOTAL CAMPANHAS
  totalCampanhas$ = this.contributions$.pipe(
    map(list => new Set(list.map(c => c.campaign)).size)
  );

  // 🔥 TOTAL INVESTIDO
  totalContribuido$ = this.contributions$.pipe(
    map(list =>
      list.reduce((t, c) => t + Number(c.amount), 0)
    )
  );

  // 🔥 ÚLTIMA CAMPANHA
  ultimaCampanha$ = this.contributions$.pipe(
    map(list => {
      if (!list.length) return 'Nenhuma campanha';

      return list
        .sort((a, b) =>
          new Date(b.contributionDate).getTime() -
          new Date(a.contributionDate).getTime()
        )[0].campaign;
    })
  );

  constructor(
    private authService: AuthService,
    private contributionService: ContributionService
  ) {}

  ngOnInit(): void {

    const user = this.authService.getUser();

    if (user) {
      this.nome = user.name || user.nome;
    }
  }

  reload() {
    this.refresh$.next();
  }
}