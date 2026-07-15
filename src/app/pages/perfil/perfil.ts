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

  private userId!: number;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.loadProfile();
  }

  loadProfile() {

    const user = this.authService.getUser();

    if (!user?.id) {

      this.usuario$ = of(null);

      return;

    }

    this.userId = user.id;

    this.usuario$ =
      this.userService.getMyProfile(user.id);

  }

  selecionarFoto(event: any) {

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    this.userService
      .uploadAvatar(this.userId, file)
      .subscribe({

        next: () => {

          this.loadProfile();

          alert('Foto atualizada com sucesso!');

        },

        error: err => console.error(err)

      });

  }

}