import { Injectable } from '@angular/core';
import { carrito } from '../interfaces/carrito';
import { Config } from '../interfaces/config';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private config:ConfigService) {
    const pedido = localStorage.getItem('carrito');
    if(pedido){
      const carritoGuardado = JSON.parse(pedido);
      if(carritoGuardado){
        const fechaGuardado = new Date(carritoGuardado.fecha);
        const fecha = new Date();
        if(fecha.getTime()-fechaGuardado.getTime()>1000*60*60*24*this.config.configuracion().diasVencimientoCarrito){
          this.vaciar();
        } else {
          this.carrito = carritoGuardado.productos;
        }
      }
    }
  }

  carrito: carrito[] = []

  agregarProducto(idProducto:number, cantidad: number, notas: string ){
    const i = this.carrito.findIndex(producto => producto.idProducto === idProducto);
    if(i === -1){
      const nuevoProducto: carrito = {idProducto:idProducto, cantidad:cantidad, notas:notas};
      this.carrito.push(nuevoProducto);
    } else {
      this.carrito[i].cantidad += cantidad;
    }
    this.actualizarAlmcenamiento();
  }

  eliminarProducto(idProducto:number){
    this.carrito = this.carrito.filter(producto => producto.idProducto !== idProducto);
    if(this.carrito.length === 0) return localStorage.removeItem("carrito")
    this.actualizarAlmcenamiento();
  }

  cambiarCantidad(idProducto:number, cantidad:number) {
    this.carrito = this.carrito.map(producto => {
      const productoActual = producto;
      if(productoActual.idProducto === idProducto) productoActual.cantidad = cantidad;
      return productoActual;
    })
    this.actualizarAlmcenamiento();
  }

  actualizarAlmcenamiento(){
    const fecha = new Date ();
    const elementoAGuardar = {
      fecha,
      productos: this.carrito,
    }
    localStorage.setItem('carrito', JSON.stringify(elementoAGuardar))
  }

  vaciar(){
    this.carrito = [];
    localStorage.removeItem("carrito");

  }

}
