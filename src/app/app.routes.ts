import { Routes } from '@angular/router';

import { LoginUser } from './pages/login-user/login-user';
import { RegisterUser } from './pages/register-user/register-user';
import { CreateCampaign } from './pages/create-campaign/create-campaign';
import { Home } from './pages/home/home';
import { MyCampaigns } from './pages/my-campaigns/my-campaigns';
import { Perfil } from './pages/perfil/perfil';
import { SupportCampaign } from './pages/support-campaign/support-campaign';

// ADMIN
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { AdminUsers } from './pages/admin/users/admin-users/admin-users';
import { AdminCampaigns } from './pages/admin/admin-campaigns/admin-campaigns';

// SUPPORTER
import { SupporterLayout } from './pages/supporter/supporter-layout/supporter-layout';
import { SupporterDashboard } from './pages/supporter/supporter-dashboard/supporter-dashboard';
import { SupporterCampaigns } from './pages/supporter/supporter-campaigns/supporter-campaigns';
import { SupporterContributions } from './pages/supporter/supporter-contributions/supporter-contributions';
import { SupporterProfile } from './pages/supporter/supporter-profile/supporter-profile';

export const routes: Routes = [

  // HOME
  {
    path: '',
    component: Home
  },

  // LOGIN
  {
    path: 'login',
    component: LoginUser
  },

  // REGISTRO
  {
    path: 'register',
    component: RegisterUser
  },

  // CRIAR CAMPANHA
  {
    path: 'criar-campanha',
    component: CreateCampaign
  },

  // PERFIL PROPONENTE
  {
    path: 'perfil',
    component: Perfil
  },

  // MINHAS CAMPANHAS
  {
    path: 'minhas-campanhas',
    component: MyCampaigns
  },

  // APOIAR CAMPANHA
  {
    path: 'campanhas/:id/apoiar',
    component: SupportCampaign
  },

  // ===========================
  // ADMIN
  // ===========================
  {
    path: 'admin',
    component: AdminLayout,
    children: [

      {
        path: '',
        component: AdminDashboard
      },

      {
        path: 'users',
        component: AdminUsers
      },

      {
        path: 'campaigns',
        component: AdminCampaigns
      }

    ]
  },

  // ===========================
  // SUPPORTER
  // ===========================
  {
    path: 'supporter',
    component: SupporterLayout,
    children: [

      {
        path: '',
        component: SupporterDashboard
      },

      {
        path: 'campaigns',
        component: SupporterCampaigns
      },

      {
        path: 'contributions',
        component: SupporterContributions
      },

      {
        path: 'profile',
        component: SupporterProfile
      }

    ]
  },

  // 404
  {
    path: '**',
    redirectTo: ''
  }

];