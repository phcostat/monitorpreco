import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacaoPageRoutingModule } from './notificacao-routing.module';

import { NotificacaoPage } from './notificacao.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacaoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NotificacaoPage]
})
export class NotificacaoPageModule {}
