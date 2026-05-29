import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {

  usuario: any;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();

    if (!user?.id) return;

    this.userService.getMyProfile(user.id).subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}