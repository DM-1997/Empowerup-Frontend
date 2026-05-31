import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css'],
})
export class Perfil {

  usuario$!: Observable<any>;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {

    console.log('PERFIL CARREGADO');

    this.loadProfile();
  }

  loadProfile() {

    const user = this.authService.getUser();

    if (!user?.id) {

      console.error('Usuário não encontrado');

      this.usuario$ = of(null);

      return;
    }

    console.log('BUSCANDO PERFIL');

    this.usuario$ = this.userService.getMyProfile(user.id);
  }
}