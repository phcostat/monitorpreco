import { Component, OnInit } from '@angular/core';

import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  usuario: Usuario;
  login: String;
  senha: String;
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastController: ToastController, private navController: NavController, private usuarioService: UsuarioService) {
    this.login = "";
    this.senha = "";
    this.usuario = new Usuario();

    this.formGroup = this.formBuilder.group({
      'login': [this.login, Validators.compose([Validators.required])],
      'senha': [this.senha, Validators.compose([Validators.required])]
    });
   }

  ngOnInit() {
    this.usuarioService.encerrar();
  }

  autenticar() {
    this.login = this.formGroup.value.login;
    this.senha = this.formGroup.value.senha;

    this.usuarioService.autenticar(this.login, this.senha).subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.usuarioService.registrar(this.usuario);
        this.navController.navigateBack('/menu');
      },
      error: (err) => {
        console.error('Login ou senha inválidos', err);
        this.exibirMensagem('Login ou senha inválidos');
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
