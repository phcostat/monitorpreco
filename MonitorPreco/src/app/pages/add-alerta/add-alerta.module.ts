import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddAlertaPageRoutingModule } from './add-alerta-routing.module';

import { AddAlertaPage } from './add-alerta.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAlertaPageRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [AddAlertaPage]
})
export class AddAlertaPageModule {}
