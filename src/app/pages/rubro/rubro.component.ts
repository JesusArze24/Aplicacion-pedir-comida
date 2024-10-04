import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/core/interfaces/productos';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ProductosService } from 'src/app/core/services/productos.service';

@Component({
  selector: 'app-rubro',
  templateUrl: './rubro.component.html',
  styleUrls: ['./rubro.component.scss']
})
export class RubroComponent {

  constructor (public headerService : HeaderService, public ac: ActivatedRoute, public categoriasService: CategoriasService) {
  }
  productosArray: WritableSignal<Producto[]> = signal([])

    ngOnInit(): void {
      this.headerService.titulo.set("Rubro");
      this.ac.params.subscribe(params => {
        if (params['id']){
          this.categoriasService.getById(parseInt(params['id'])).then(categoria =>
            {if (categoria){
              this.productosArray.set(categoria.productos);
              this.headerService.titulo.set(categoria.nombre)
          }})
        }
      })
    }
  }
