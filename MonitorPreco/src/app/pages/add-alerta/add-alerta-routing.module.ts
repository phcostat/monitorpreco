import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAlertaPage } from './add-alerta.page';

const routes: Routes = [
  {
    path: '',
    component: AddAlertaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAlertaPageRoutingModule {}
