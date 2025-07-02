import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { authLoginGuard } from './core/guards/authGuard/auth-login-guard.guard';
import { AdminAuthGuard } from './core/guards/authGuard/admin-auth-guard';
import { authGuard } from './core/guards/authGuard/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        title: 'Home',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'search',
        title: 'Search',
        loadComponent: () =>
          import('./features/search/search.component').then(
            (m) => m.SearchComponent
          ),
      },
      {
        path: 'profile/:id',
        title: 'Profile',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/profile/profile.component').then(
            (m) => m.ProfileComponent
          ),
      },
      {
        path: 'details/:id',
        title: 'Details',
        loadComponent: () =>
          import('./features/details/details.component').then(
            (m) => m.DetailsComponent
          ),
      },
      {
        path: 'new-event',
        title: 'New event',
        canActivate:[authGuard],
        loadComponent: () =>
          import('./features/new-event/new-event.component').then(
            (m) => m.NewEventComponent
          ),
      },
      {
        path: 'admin-panel',
        title: 'Admin Panel',
        canActivate: [AdminAuthGuard],
        loadComponent: () =>
          import('./features/admin-panel/admin-panel.component').then(
            (m) => m.AdminPanelComponent
          ),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        title: 'Login',
        canActivate: [authLoginGuard],
        loadComponent: () =>
          import('./features/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'register',
        title: 'Register',
        canActivate: [authLoginGuard],
        loadComponent: () =>
          import('./features/auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
