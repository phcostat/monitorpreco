export class Usuario {
    id: number;
    nome: string;
    login: string;
    email: string;
    chave: string;

    constructor(){
        this.id = 0;
        this.nome = "";
        this.login = "";
        this.email = "";
        this.chave = "";
    }
}
