import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register-user.html',
  styleUrls: ['./register-user.css'],
})
export class RegisterUser {

  nome = '';
  email = '';
  password = '';
  tipo = 'APOIADOR';

  register() {
    console.log('Register:', {
      nome: this.nome,
      email: this.email,
      password: this.password,
      tipo: this.tipo
    });
  }
}