import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { LoginComponent } from './auth/login/login.component';
import { PagesComponent } from './pages/pages.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PlaysComponent } from './pages/plays/plays.component';


export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'dash',
        component: PagesComponent,
        canActivate: [ authGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dahsboard' } },
            { path: 'plays', component: PlaysComponent, data: { titulo: 'Plays'} }
        ]
    },
    { path: '**', component: NopagefoundComponent },
];
