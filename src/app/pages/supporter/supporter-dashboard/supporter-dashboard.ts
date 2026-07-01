import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supporter-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supporter-dashboard.html',
  styleUrl: './supporter-dashboard.css',
})
export class SupporterDashboard {

  nome = 'Emerson';

  totalCampanhas = 8;

  totalContribuido = 250000;

  ultimaCampanha = 'Água para Todos';

}