import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supporter-contributions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supporter-contributions.html',
  styleUrl: './supporter-contributions.css',
})
export class SupporterContributions {

  contribuicoes = [
    {
      id: 1,
      campanha: 'Água para Todos',
      valor: 50000,
      data: '10/07/2025',
      metodo: 'Transferência',
      estado: 'Confirmado'
    },
    {
      id: 2,
      campanha: 'Construção de Escola',
      valor: 150000,
      data: '20/07/2025',
      metodo: 'Cartão',
      estado: 'Confirmado'
    },
    {
      id: 3,
      campanha: 'Centro de Saúde',
      valor: 25000,
      data: '01/08/2025',
      metodo: 'PayPal',
      estado: 'Pendente'
    }
  ];

}