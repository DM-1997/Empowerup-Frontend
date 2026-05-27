import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './register-user.html',
  styleUrls: ['./register-user.css'],
})
export class RegisterUser {

  nome = '';
  email = '';
  password = '';
  tipo = 'DOADOR';

  showSuccessModal = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {

    const payload = {
      nome: this.nome,
      email: this.email,
      password: this.password,
      tipo: this.tipo
    };

    this.authService.register(payload).subscribe({
      next: (res) => {
        console.log('Registo OK:', res);

        // 🔥 mostra modal
        this.showSuccessModal = true;

        // ⏳ depois redireciona
        setTimeout(() => {
          this.showSuccessModal = false;
          this.router.navigate(['/login']);
        }, 2000);
      },

      error: (err) => {
        console.error('Erro:', err);
      }
    });
  }
}