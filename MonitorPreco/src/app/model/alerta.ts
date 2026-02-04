import { Produto } from "./produto";

export class Alerta {
    id: number;
    produto: Produto;
    valor: number;

    constructor(){
        this.id = 0;
        this.produto = new Produto();
        this.valor = 0;
    }
}
