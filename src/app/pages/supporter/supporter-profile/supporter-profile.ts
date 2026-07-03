import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-supporter-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './supporter-profile.html',
  styleUrl: './supporter-profile.css',
})
export class SupporterProfile implements OnInit {

  utilizador: any = {
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    foto: 'https://i.pravatar.cc/300'
  };

  mensagem: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    const user = this.authService.getUser();

    if (user) {

      this.utilizador = {
        nome: user.nome || user.name || '',
        email: user.email || '',
        telefone: user.telefone || user.phone || '',
        endereco: user.endereco || user.address || '',
        foto: user.foto || user.photo || 'https://i.pravatar.cc/300'
      };

    }

  }

  guardar(): void {

    // Aqui futuramente será chamada a API para atualizar o perfil

    // Atualiza também o utilizador armazenado localmente
    this.authService.setUser({
      ...this.authService.getUser(),
      ...this.utilizador
    });

    this.mensagem = 'Perfil atualizado com sucesso!';

    setTimeout(() => {
      this.mensagem = null;
    }, 3000);

  }

}