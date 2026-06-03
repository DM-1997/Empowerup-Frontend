import { Routes } from '@angular/router';

import { LoginUser } from './pages/login-user/login-user';
import { RegisterUser } from './pages/register-user/register-user';
import { CreateCampaign } from './pages/create-campaign/create-campaign';
import { Home } from './pages/home/home';
import { MyCampaigns } from './pages/my-campaigns/my-campaigns';
import { Perfil } from './pages/perfil/perfil';

import { AdminDashboard } from './pages/admin/admin-dashboard/admin-dashboard';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { AdminUsers } from './pages/admin/users/admin-users/admin-users';
import { AdminCampaigns } from './pages/admin/admin-campaigns/admin-campaigns';
import { SupportCampaign } from './pages/support-campaign/support-campaign';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'login',
    component: LoginUser
  },
  {
    path: 'criar-campanha',
    component: CreateCampaign
  },
  {
    path: 'register',
    component: RegisterUser
  },
  {
    path: 'perfil',
    component: Perfil
  },
  {
    path: 'minhas-campanhas',
    component: MyCampaigns
  },

  {
  path: 'campanhas/:id/apoiar',
  component: SupportCampaign
},

  // 🔴 ADMIN AREA
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

  {
    path: '**',
    redirectTo: ''
  }
];