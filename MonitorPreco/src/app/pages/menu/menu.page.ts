import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Alerta } from 'src/app/model/alerta';
import { AlertaService } from 'src/app/services/alerta.service';
import { Produto } from 'src/app/model/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false
})
export class MenuPage implements OnInit {

  private alertas: Alerta[];
  private produto: Produto;

  constructor(private alertaService: AlertaService, private produtoService: ProdutoService, private navController: NavController) {
    this.alertas = [];
    this.produto = new Produto();
  }

  menu = [
    { descricao: "Alertas", rota: "/alerta", icone: "notifications", cor: "dark"  },
    { descricao: "Minhas Compras", rota: "/minhas-compras", icone: "exit", cor: "dark" },
    { descricao: "Sair", rota: "/login", icone: "exit", cor: "danger" }
  ];

  ngOnInit() {
    setInterval(() => {
      console.log("procurando...");
      this.verificarAlertas();
    }, 10000);
  }

  async verificarAlertas() {
    this.alertas = this.alertaService.listar();

    this.alertas.forEach((alerta) => {
      
      this.produtoService.buscarPorId(alerta.produto.id).subscribe({
        next: (produto) => {
          this.produto = produto;
          if (produto.valor <= alerta.valor) {
            console.log("teste");
            this.navController.navigateBack('/notificacao/' + alerta.id);
          }
        },
        error: (err) => {
          console.error('Erro ao buscar produto por ID:', err);
        }
      });

    });
  }

}
