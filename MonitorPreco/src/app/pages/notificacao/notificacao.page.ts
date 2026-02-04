import { Component, OnInit } from '@angular/core';
import { Alerta } from 'src/app/model/alerta';
import { AlertaService } from 'src/app/services/alerta.service';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/services/produto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.page.html',
  styleUrls: ['./notificacao.page.scss'],
  standalone: false
})
export class NotificacaoPage implements OnInit {

  produto: Produto;
  alerta: Alerta;
  formGroup: FormGroup;
  audio: HTMLAudioElement;

  constructor(private formBuilder: FormBuilder, private toastController: ToastController, private activatedRoute: ActivatedRoute, private navController: NavController, private alertaService: AlertaService, private produtoService: ProdutoService) {
    this.alerta = new Alerta();
    this.produto = new Produto();
    this.audio = new Audio('assets/beep.mp3');
    this.formGroup = this.formBuilder.group({
      'descricao': [this.alerta.produto.descricao, Validators.compose([Validators.required])],
      'valorAtual': [this.produto.valor, Validators.compose([Validators.required])],
      'valorDesejado': [this.alerta.valor, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {

    const idAlerta = parseFloat(this.activatedRoute.snapshot.params['id']);

    if (!isNaN(idAlerta)) {
      this.audio.loop = true;
      this.audio.play();
      this.alerta = this.alertaService.buscarPorId(idAlerta);
      this.produtoService.buscarPorId(this.alerta.produto.id).subscribe({
        next: (produto) => {
          this.produto = produto;
          this.formGroup.get('descricao')?.setValue(this.alerta.produto.descricao);
          this.formGroup.get('valorAtual')?.setValue(this.produto.valor);
          this.formGroup.get('valorDesejado')?.setValue(this.alerta.valor);
        },
        error: (err) => {
          this.exibirMensagem('Erro ao carregar o produto.');
        }
      });
    }
  }

  fecharAlerta() {
    this.audio.pause();
    this.navController.navigateBack('/menu');
  }

  excluirAlerta() {
    this.alertaService.excluir(this.alerta.id);
    this.fecharAlerta();
  }

  comprarProduto() {
      // Recupera o usuário autenticado do localStorage
      const usuario = JSON.parse(localStorage.getItem('usuarioAutenticado') || '{}');

      // Verifica se dados estão completos
      if (!usuario || !usuario.id || !usuario.chave) {
        this.exibirMensagem("Erro: usuário não autenticado corretamente.");
        return;
      }

      // Monta os dados da compra
      const dadosCompra = {
        idProduto: this.produto.id,
        idUsuario: usuario.id,
        quantidade: 1
      };

      // Chama o serviço para realizar a compra
      this.produtoService.comprar(dadosCompra, usuario.chave).subscribe({
        next: () => {
          this.exibirMensagem('Compra realizada com sucesso!');
          this.excluirAlerta(); // Remove o alerta após a compra
        },
        error: (err) => {
          console.error('Erro ao realizar compra:', err);
          this.exibirMensagem('Erro ao realizar compra.');
        }
      });
  }



  async exibirMensagem(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1500
    });
    toast.present()
  }
}
