import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Busqueda } from 'src/app/core/interfaces/busqueda';
import { Producto } from 'src/app/core/interfaces/productos';
import { HeaderService } from 'src/app/core/services/header.service';
import { ProductosService } from 'src/app/core/services/productos.service';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss']
})
export class BuscarComponent  {

  constructor (public headerService : HeaderService) {
  }
  productosService = inject(ProductosService);
  productos:WritableSignal<Producto[]>= signal([]);

    ngOnInit(): void {
      this.headerService.titulo.set("Buscar");
      this.productosService.getAll().then(res => this.productos.set(res));
    }

  parametrosBusqueda:Busqueda = {
    texto :"",
    aptoVegano: false,
    aptoCeliaco: false,
  }

  async buscar() {
    this.productos.set(await this.productosService.buscar(this.parametrosBusqueda));
  }
}
