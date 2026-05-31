import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-campaigns',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-campaigns.html',
  styleUrl: './admin-campaigns.css',
})
export class AdminCampaigns {

  campaigns = [
    {
      id: 1,
      titulo: 'Horta Comunitária',
      utilizador: 'João Silva',
      meta: 10000,
      arrecadado: 6000,
      estado: 'ATIVA'
    },
    {
      id: 2,
      titulo: 'Educação Digital',
      utilizador: 'Maria Costa',
      meta: 15000,
      arrecadado: 12000,
      estado: 'ATIVA'
    },
    {
      id: 3,
      titulo: 'Empreendedorismo Local',
      utilizador: 'Carlos Santos',
      meta: 8000,
      arrecadado: 8000,
      estado: 'CONCLUIDA'
    }
  ];

  deleteCampaign(id: number) {
    this.campaigns = this.campaigns.filter(c => c.id !== id);
  }

  approveCampaign(id: number) {

  this.campaigns = this.campaigns.map(c => {

    if (c.id === id && c.estado !== 'ATIVA') {
      return {
        ...c,
        estado: 'ATIVA'
      };
    }

    return c;
  });
}

}