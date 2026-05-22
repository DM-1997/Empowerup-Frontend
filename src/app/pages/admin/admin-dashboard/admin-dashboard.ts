import { Component } from '@angular/core';
import { AdminNavbar } from "../../../shared/admin-navbar/admin-navbar";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AdminNavbar],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  totalUsers = 120;
  totalCampaigns = 45;
  totalRaised = 250000;

}