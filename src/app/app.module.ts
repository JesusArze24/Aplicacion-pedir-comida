import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabsComponent } from './core/components/tabs/tabs.component';
import { HeaderComponent } from './core/components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { TarjetaCategoriaComponent } from './core/components/tarjeta-categoria/tarjeta-categoria.component';
import { TarjetaProductoComponent } from './core/components/tarjeta-producto/tarjeta-producto.component';
import { RubroComponent } from './pages/rubro/rubro.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { ContadorCantidadComponent } from './core/components/contador-cantidad/contador-cantidad.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    HeaderComponent,
    HomeComponent,
    RubroComponent,
    TarjetaCategoriaComponent,
    TarjetaProductoComponent,
    ArticuloComponent,
    ContadorCantidadComponent,
    CarritoComponent,
    BuscarComponent,
    PerfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

