import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-minhas-compras',
  templateUrl: './minhas-compras.page.html',
  styleUrls: ['./minhas-compras.page.scss'],
  standalone: false
})
export class MinhasComprasPage implements OnInit {

  compras: any[] = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuarioAutenticado') || '{}');
    if (usuario && usuario.id && usuario.chave) {
      this.produtoService.listarCompras(usuario.id, usuario.chave).subscribe({
        next: (res) => {
          this.compras = res;
        },
        error: (err) => {
          console.error('Erro ao listar compras:', err);
        }
      });
    }
  }
}
