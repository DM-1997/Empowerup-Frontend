import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-supporter-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './supporter-layout.html',
  styleUrl: './supporter-layout.css',
})
export class SupporterLayout implements OnInit {

  nome = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    const user = this.authService.getUser();

    if (user) {
      this.nome = user.name || user.nome;
    }

  }

}