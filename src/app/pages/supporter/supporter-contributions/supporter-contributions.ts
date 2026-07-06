import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import {
  Contribution,
  ContributionService
} from '../../../core/services/contribution.service';

@Component({
  selector: 'app-supporter-contributions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supporter-contributions.html',
  styleUrl: './supporter-contributions.css',
})
export class SupporterContributions implements OnInit {

  contribuicoes: Contribution[] = [];

  constructor(
    private contributionService: ContributionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    const supporterId = this.authService.getUserId();

    if (!supporterId) {
      return;
    }

    this.contributionService
      .findBySupporter(supporterId)
      .subscribe({

        next: (data) => {

          this.contribuicoes = data;

        },

        error: (err) => {

          console.error(err);

        }

      });

  }

}