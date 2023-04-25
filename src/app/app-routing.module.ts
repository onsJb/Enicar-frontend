import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './component/search/search.component';
import { HomeComponent } from './home/home.component';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';

export const Approutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/component/home', pathMatch: 'full' },     
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      },
      
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/component/home' },
  
];
