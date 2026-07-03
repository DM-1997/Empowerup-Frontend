import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-supporter-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supporter-dashboard.html',
  styleUrl: './supporter-dashboard.css',
})
export class SupporterDashboard implements OnInit {

  nome = '';

  totalCampanhas = 8;

  totalContribuido = 250000;

  ultimaCampanha = 'Água para Todos';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    const user = this.authService.getUser();

    if (user) {
      this.nome = user.name || user.nome;
    }

  }

}