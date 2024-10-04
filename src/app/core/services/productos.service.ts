import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/productos';
import { Categoria } from '../interfaces/categorias';
import { Busqueda } from '../interfaces/busqueda';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }

  async getByIdCategoria(id:Number): Promise<Producto[]>{
    const res = await fetch("../../../assets/data/database.json");
    const resJson: Categoria[] = await res.json();
    const productos = resJson.find(categoria => categoria.id === id)?.productos;
    if(productos) return productos;
    return [];
  }

  async getAll ():Promise<Producto[]>{
    const res = await fetch("../../../assets/data/database.json");
    const resJson:Categoria[] = await res.json()
    let productos:Producto[] = [];
    resJson.forEach(categoria => {
      productos = [...productos, ...categoria.productos]
    })
    return productos;
  }

  async getById(id:number):Promise<Producto | undefined> {
    const productos = await this.getAll();
    const productoElegido = productos.find(producto => producto.id === id);
    return productoElegido ? productoElegido: undefined;
  }

  async buscar(parametrosBusqueda:Busqueda){
    const productos = await this.getAll();
    const productosFiltrados = productos.filter(producto => {
      if (parametrosBusqueda.aptoCeliaco && !producto.esCeliaco) return false;
      if (parametrosBusqueda.aptoVegano && !producto.esVegano) return false;
      const busquedaTitulo = producto.nombre.toLowerCase().includes(parametrosBusqueda.texto);
      console.log(busquedaTitulo);
      if(busquedaTitulo) return true;
      for(let i=0; i < producto.ingredientes.length; i++){
        const ingrediente = producto.ingredientes[i];
        if(ingrediente.toLowerCase().includes(parametrosBusqueda.texto.toLowerCase())) return true;
        }
      return false;
    })
    return productosFiltrados;
  }

}
