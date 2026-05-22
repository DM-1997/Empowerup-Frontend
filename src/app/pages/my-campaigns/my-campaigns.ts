import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-campaigns',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-campaigns.html',
  styleUrl: './my-campaigns.css',
})
export class MyCampaigns {

  campanhas = [
    {
      id: 1,
      titulo: 'Horta Comunitária',
      descricao: 'Projeto para criar hortas urbanas sustentáveis.',
      arrecadado: 6000,
      meta: 10000,
      imagem: 'https://picsum.photos/300/200'
    },
    {
      id: 2,
      titulo: 'Educação Digital',
      descricao: 'Levar tecnologia e programação para jovens.',
      arrecadado: 4000,
      meta: 10000,
      imagem: 'https://picsum.photos/300/201'
    },
    {
      id: 3,
      titulo: 'Empreendedorismo Local',
      descricao: 'Apoio a pequenos negócios comunitários.',
      arrecadado: 7500,
      meta: 10000,
      imagem: 'https://picsum.photos/300/202'
    }
  ];

  editar(id: number) {
    console.log('Editar campanha:', id);
  }

  eliminar(id: number) {
    console.log('Eliminar campanha:', id);
  }
}