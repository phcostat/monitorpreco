import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/model/alerta';
import { AlertaService } from 'src/app/services/alerta.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.page.html',
  styleUrls: ['./alerta.page.scss'],
  standalone: false
})
export class AlertaPage implements OnInit {

  alertas: Alerta[];

  constructor(private alertaService: AlertaService, private toastController: ToastController, private alertController: AlertController) {
    this.alertas = [];
   }

  ngOnInit() {
    this.alertas = this.alertaService.listar();
  }

  ionViewWillEnter() {
    this.alertas = this.alertaService.listar();
  }

  async excluir(alerta: Alerta) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão',
      message: alerta.produto.descricao,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Confirmar',
          cssClass: 'danger',
          handler: () => {
            this.alertaService.excluir(alerta.id);
            this.alertas = this.alertaService.listar();
            this.exibirMensagem('Registro excluído com sucesso!!!');
          }
        }
      ]
    });
    await alert.present();
  }

  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }

}
