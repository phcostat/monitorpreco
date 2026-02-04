import { Injectable } from '@angular/core';
import { Alerta } from '../model/alerta';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor() { }

  salvar(alerta: Alerta) {
    let alertas = JSON.parse(localStorage.getItem('alertas') || '[]');
    // Verificação: já existe alerta para o mesmo produto?
    const jaExiste = alertas.some((a: Alerta) => a.produto.id === alerta.produto.id && a.id !== alerta.id);

    if (jaExiste) {
      throw new Error("Já existe um alerta para esse produto.");
    }

    if (alerta.id === 0) {
      alerta.id = (new Date().getTime() / 1000) * Math.random();
      alertas.push(alerta);
    } else {
      let posicao = alertas.findIndex((elemento: Alerta) => elemento.id === alerta.id);
      alertas[posicao] = alerta;
    }

    localStorage.setItem('alertas', JSON.stringify(alertas));
  }

  listar() {
    let contatos = JSON.parse(localStorage.getItem('alertas') || '[]');
    return contatos;
  }

  buscarPorId(id: number) {
    let alertas = JSON.parse(localStorage.getItem('alertas') || '[]');
    let alerta = new Alerta();
    alerta = alertas.find((elemento: Alerta) => elemento.id === id);
    return alerta;
  }

  excluir(id: number) {
    let alertas = JSON.parse(localStorage.getItem('alertas') || '[]');
    alertas = alertas.filter((elemento: Alerta) => elemento.id !== id);
    localStorage.setItem('alertas', JSON.stringify(alertas));
  }
}
