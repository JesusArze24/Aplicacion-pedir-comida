import { Component, Input,  } from '@angular/core';
import { Categoria } from '../../interfaces/categorias';

@Component({
  selector: 'app-tarjeta-categoria',
  templateUrl: './tarjeta-categoria.component.html',
  styleUrls: ['./tarjeta-categoria.component.scss'],
  //standalone: true
})
export class TarjetaCategoriaComponent {

  @Input({required:true}) categoriaInp!:Categoria;

}
