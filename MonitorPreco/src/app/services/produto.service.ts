import { Injectable } from '@angular/core';

import { Produto } from '../model/produto';
import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl = 'https://api-odinstore.odiloncorrea.com/produtos';

  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl, this.getHttpOptions());
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`, this.getHttpOptions());
  }

  comprar(dadosCompra: any, chave: string) {
    const headers = { 'Authorization': chave };
    return this.http.post("https://api-odinstore.odiloncorrea.com/compras", dadosCompra, { headers });
  }

  listarCompras(idUsuario: number, chave: string) {
    const headers = {
      'Authorization': chave
    };
    const url = `https://api-odinstore.odiloncorrea.com/usuarios/${idUsuario}/compras`;
    return this.http.get<any[]>(url, { headers });
  }


  private getHttpOptions() {
    const usuario = this.usuarioService.carregar()
    return {
      headers: new HttpHeaders({
        'Authorization': usuario.chave
      })
    };
  }
}
