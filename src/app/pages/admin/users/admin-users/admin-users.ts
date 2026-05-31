import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers {

  private refresh$ = new BehaviorSubject<void>(undefined);

  private mensagemSucessoSubject = new BehaviorSubject<string | null>(null);
  mensagemSucesso$ = this.mensagemSucessoSubject.asObservable();

  users$ = this.refresh$.pipe(
    switchMap(() => this.userService.getAllUsers())
  );

  constructor(private userService: UserService) {}

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: () => {

        // 🔥 recarrega lista
        this.refresh$.next();

        // ✅ mensagem sucesso (reativa)
        this.mensagemSucessoSubject.next('Usuário eliminado com sucesso!');

        // ⏱️ limpar após 3s
        setTimeout(() => {
          this.mensagemSucessoSubject.next(null);
        }, 3000);
      },
      error: (err) => console.error(err)
    });
  }
}