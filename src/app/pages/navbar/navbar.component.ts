import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { UsuarioDataService } from '../../_services/usuario-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  private nombrePersona: string = '';
  private perfilMenu: any;

  constructor(
    private route: Router,
    private authService: AuthService,
    private usuarioDataService: UsuarioDataService
  ) { }

  ngOnInit() {
    this.usuarioDataService
      .getDatosUsuario()
      .then((usuario:any) => {
          this.nombrePersona = (usuario.apellidoPaterno + ' ' + usuario.apellidoMaterno + ' ' + usuario.nombre);
          this.perfilMenu = usuario.perfil;
      });

  }

  salir() {
    this.authService
      .logoutUser()
      .subscribe(
      data => {
        this.route.navigate(['login']);
      },
      err => {
        let error = err.json().error;
        console.log(err.json().error);
      }
      );
  }
}
