import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers {

  users = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', tipo: 'PROPONENTE' },
    { id: 2, nome: 'Maria Costa', email: 'maria@email.com', tipo: 'APOIADOR' },
    { id: 3, nome: 'Admin Master', email: 'admin@email.com', tipo: 'ADMINISTRADOR' },
  ];

  deleteUser(id: number) {
    this.users = this.users.filter(u => u.id !== id);
  }

}