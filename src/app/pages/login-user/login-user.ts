import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login-user.html',
  styleUrls: ['./login-user.css'],
})
export class LoginUser {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    const payload = {
      email: this.email,
      password: this.password
    };

    this.authService.login(payload).subscribe({
      next: (res: any) => {

        console.log('Login OK:', res);

        // guardar utilizador/token
        this.authService.setUser(res);

        alert('Login feito com sucesso!');

        // redirecionar para home
        this.router.navigate(['/']);

      },

      error: (err) => {
        console.error('Erro login:', err);
        alert('Credenciais inválidas');
      }
    });
  }
}