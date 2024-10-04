import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/core/interfaces/productos';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { ProductosService } from 'src/app/core/services/productos.service';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent {

  headerService = inject(HeaderService);
  productosService = inject(ProductosService);
  carritoService = inject (CarritoService);
  producto?:Producto;
  cantidad = signal(1);
  notas = "";

  ngOnInit(): void {
      this.headerService.titulo.set("Artículo")
  }

  constructor (private ac:ActivatedRoute, private router: Router) {
    ac.params.subscribe(param => {
      if(param['id']) {
        this.productosService.getById(param['id']).then(producto => {
          this.producto = producto;
          this.headerService.titulo.set(producto!.nombre)
        })
      }
    })
  }

  agregarAlCarrito(){
    if(!this.producto) return;
    this.carritoService.agregarProducto(this.producto.id, this.cantidad(), this.notas);
    this.router.navigate(["/carrito"]);
  }
}