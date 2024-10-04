import { Component, inject } from '@angular/core';
import { HeaderService } from 'src/app/core/services/header.service';
import { Perfil } from 'src/app/core/interfaces/perfil';
import { PerfilService } from 'src/app/core/services/perfil.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  constructor (public headerService : HeaderService) {
  }
  perfilService = inject(PerfilService);
  router = inject(Router)

  perfil:Perfil ={
    nombre:"",
    direccion:"",
    detalleEntrega:"",
    telefono:""
  }
    ngOnInit(): void {
      this.headerService.titulo.set("Perfil")
      if(this.perfilService.perfil()){
        this.perfil = {...this.perfilService.perfil()!}
      }
    }

  guardarDatosPerfil() {
    this.perfilService.guardarDatos(this.perfil);
    this.router.navigate(['/carrito']);
  }
}
