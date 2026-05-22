import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil {

  usuario = {
    nome: 'João Silva',
    email: 'joao@email.com',
    avatar: 'https://i.pravatar.cc/150',
    campanhasCriadas: 5,
    campanhasApoiadas: 12
  };

}