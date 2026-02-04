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
  selector: 'app-add-alerta',
  templateUrl: './add-alerta.page.html',
  styleUrls: ['./add-alerta.page.scss'],
  standalone: false
})
export class AddAlertaPage implements OnInit {

  produtos: Produto[];
  alerta: Alerta;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastController: ToastController, private activatedRoute: ActivatedRoute, private navController: NavController, private alertaService: AlertaService, private produtoService: ProdutoService) {
    this.produtos = [];
    this.alerta = new Alerta();

    this.formGroup = this.formBuilder.group({
      'produto': [this.alerta.produto, Validators.compose([Validators.required])],
      'valor': [this.alerta.valor, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.carregarProdutos();
    const id = parseFloat(this.activatedRoute.snapshot.params['id']);
    if (!isNaN(id)) {
      this.alerta = this.alertaService.buscarPorId(id);
      const produtoEncontrado = this.produtos.find(t => t.id === this.alerta.produto.id);
      if (produtoEncontrado) {
        this.alerta.produto = produtoEncontrado;
      }
      this.formGroup.get('produto')?.setValue(this.alerta.produto);
      this.formGroup.get('valor')?.setValue(this.alerta.valor);
    }
  }

  salvar() {
    try {
      this.alerta.produto = this.formGroup.value.produto;
      this.alerta.valor = this.formGroup.value.valor;
      this.alertaService.salvar(this.alerta);
      this.exibirMensagem('Registro salvo com sucesso!!!');
      this.navController.navigateBack('/alerta');
    } catch (e: any) {
      this.exibirMensagem(e.message || "Erro ao salvar alerta.");
    }


  }

  carregarProdutos() {
    this.produtoService.listar().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: (err) => {
        this.exibirMensagem('Erro ao carregar os produtos.');
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
