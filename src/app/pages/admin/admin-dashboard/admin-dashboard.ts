import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavbar } from "../../../shared/admin-navbar/admin-navbar";
import { AdminDashboardService, AdminDashboardStats } from '../../../core/services/admin-dashboard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AdminNavbar],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  stats$!: Observable<AdminDashboardStats>;

  constructor(private adminDashboardService: AdminDashboardService) {
    this.stats$ = this.adminDashboardService.getStats();
  }
}