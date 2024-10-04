import { Component, ElementRef, inject, signal, ViewChild, WritableSignal} from '@angular/core';
import { Router } from '@angular/router';
import { numeroWhatsapp } from 'src/app/core/constants/telefono';
import { Producto } from 'src/app/core/interfaces/productos';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { ConfigService } from 'src/app/core/services/config.service';
import { HeaderService } from 'src/app/core/services/header.service';
import { PerfilService } from 'src/app/core/services/perfil.service';
import { ProductosService } from 'src/app/core/services/productos.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss'],
})
export class CarritoComponent {

  constructor (public headerService : HeaderService) {
  }
  carritoService = inject(CarritoService);
  productosService = inject(ProductosService);
  productosCarrito: WritableSignal<Producto[]> = signal([]);
  configService = inject(ConfigService);
  perfilService = inject(PerfilService);
  router = inject(Router);

  subtotal = 0;
  total = 0;
  @ViewChild("dialog") dialog!:ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    this.headerService.titulo.set("Carrito");
    this.buscarInformacionProductos().then(() => {
      this.calcularInformacion();
    })
  }

  async buscarInformacionProductos() {
    for(let i = 0; i<this.carritoService.carrito.length; i++){
      const itemCarrito = this.carritoService.carrito[i];
      const res = await this.productosService.getById(itemCarrito.idProducto);
      if(res) this.productosCarrito.set([...this.productosCarrito(),res]);
    }
  }

  eliminarProducto(idProducto: number){
    this.carritoService.eliminarProducto(idProducto);
    this.calcularInformacion();
  }
  calcularInformacion() {
    this.subtotal = 0;
    for(let i=0; i< this.carritoService.carrito.length; i++) {
      this.subtotal += this.productosCarrito()[i].precio*this.carritoService.carrito[i].cantidad;
    }
    this.total = this.subtotal + this.configService.configuracion().costoEnvio;
  }

  cambiarCantidadProducto(id:number, cantidad:number){
    this.carritoService.cambiarCantidad(id, cantidad);
    this.calcularInformacion();
  }

  async enviarMensaje(){
    let pedido = ``;

    for(let i=0; i<this.carritoService.carrito.length; i++){
      const producto = await this.productosService.getById(this.carritoService.carrito[i].idProducto);
      pedido += ` * ${ this.carritoService.carrito[i].cantidad} X ${producto?.nombre}
`;}

    const mensaje = `Hola! mi nombre es ${this.perfilService.perfil()?.nombre}, quiero hacer el siguiente pedido:
${pedido}Si necesitas comunicarte conmigo escríbeme al numero del que te hablo o al: ${this.perfilService.perfil()?.telefono}.
La dirección de envío es: ${this.perfilService.perfil()?.direccion} - ${this.perfilService.perfil()?.detalleEntrega}.
Muchas gracias!`

  const link = `https://wa.me/${numeroWhatsapp}?text=${encodeURI(mensaje)}`;
  window.open(link, '_blank');

    this.dialog.nativeElement.showModal();

  }

  finalizarPedido() {
    this.carritoService.vaciar();
    this.dialog.nativeElement.close();
    this.router.navigate(["/"]);
  }

  editarPedido() {
    this.dialog.nativeElement.close();
  }

}
