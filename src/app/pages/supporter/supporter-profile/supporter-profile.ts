import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-supporter-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './supporter-profile.html',
  styleUrl: './supporter-profile.css',
})
export class SupporterProfile {

  utilizador = {
    nome: 'Emerson',
    email: 'emerson@email.com',
    telefone: '+244 923 456 789',
    endereco: 'Luanda, Angola',
    foto: 'https://i.pravatar.cc/300'
  };

  mensagem: string | null = null;

  guardar(): void {

    // Depois será feita a chamada ao backend

    this.mensagem = 'Perfil atualizado com sucesso!';

    setTimeout(() => {
      this.mensagem = null;
    }, 3000);

  }

}