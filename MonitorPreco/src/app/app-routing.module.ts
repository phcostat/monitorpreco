import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'add-alerta',
    loadChildren: () => import('./pages/add-alerta/add-alerta.module').then( m => m.AddAlertaPageModule)
  },
  {
    path: 'alerta',
    loadChildren: () => import('./pages/alerta/alerta.module').then( m => m.AlertaPageModule)
  },
  {
    path: 'notificacao',
    loadChildren: () => import('./pages/notificacao/notificacao.module').then( m => m.NotificacaoPageModule)
  },
  {
  path: 'notificacao/:id',
  loadChildren: () => import('./pages/notificacao/notificacao.module').then(m => m.NotificacaoPageModule)
  },
  {
    path: 'minhas-compras',
    loadChildren: () => import('./pages/minhas-compras/minhas-compras.module').then( m => m.MinhasComprasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
