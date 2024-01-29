import { IUsuario } from './../../interfaces/iusuario';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  form!: FormGroup
  bandera: boolean = false;
  mostrarContrasena: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _toast: ToastService,
    private _authentication: AuthenticationService
  ) {
    this.form = this.fb.group({
      username:   ['', Validators.required],
      password:   ['', Validators.required]
    })
  }

  handleLogin() {
    if(this.form.invalid){
      this._toast.error('Campos vacíos')
      return
    }

    const credentials: IUsuario = {
      login: this.form.value.username,
      clave: this.form.value.password
    }

    this.bandera = true;
    this._authentication.authentication(credentials).subscribe({
      next: (usuario: any) => {
        console.log(usuario);
        //let respuesta =JSON.stringify(usuario);
        this.handleSuccessfulLogin(usuario);        
      },
      error: (error) => {
        this.handleInvalidCredentials(error);
      },
      complete: () => {
        this.bandera = false;
      },
    });
  }

  private handleInvalidCredentials(error: any) {
    this._toast.warning("Credenciales incorrectas");
    this.resetFormAndFlag();
  }
  
  private handleSuccessfulLogin(token: any) 
  
  {
    localStorage.clear();
    localStorage.setItem('token_value', token.jwTtoken);
    this._toast.success('Enhorabuena, estás dentro');
    this.resetFormAndFlag();
    this.router.navigate(['/setting']);
  }
  
  private resetFormAndFlag() {
    this.form.reset();
    this.bandera = false;
  }  
  
}
