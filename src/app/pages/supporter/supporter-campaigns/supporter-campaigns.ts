import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supporter-campaigns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supporter-campaigns.html',
  styleUrl: './supporter-campaigns.css',
})
export class SupporterCampaigns {

  campanhas = [
    {
      id: 1,
      titulo: 'Água para Todos',
      descricao: 'Ajude famílias a terem acesso à água potável.',
      imagem: 'https://picsum.photos/400/250?random=1',
      meta: 500000,
      arrecadado: 180000
    },
    {
      id: 2,
      titulo: 'Construção de Escola',
      descricao: 'Vamos construir uma escola para crianças da comunidade.',
      imagem: 'https://picsum.photos/400/250?random=2',
      meta: 1200000,
      arrecadado: 700000
    },
    {
      id: 3,
      titulo: 'Centro de Saúde',
      descricao: 'Contribua para melhorar os serviços de saúde.',
      imagem: 'https://picsum.photos/400/250?random=3',
      meta: 900000,
      arrecadado: 350000
    }
  ];

  apoiar(campanha: any): void {
    alert(`Você escolheu apoiar: ${campanha.titulo}`);
  }

}