import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProveedoresComponent } from './proveedores/proveedores/proveedores.component';
import { MarcasComponentComponent } from './marcas-component/marcas-component.component';
import { MediosDePagoComponent } from './medios-de-pago/medios-de-pago.component';
import { TipoOfertaComponent } from './tipo-oferta/tipo-oferta.component';
import { EventoOfertaComponent } from './evento-oferta/evento-oferta.component';
import { PuntoCompraComponent } from './punto-compra/punto-compra.component';
import { PlazoCreditoComponent } from './plazo-credito/plazo-credito.component';
import { TipoVentajaComponent } from './tipo-ventaja/tipo-ventaja.component';
import { GestionDevolucionesComponent } from './gestion-devoluciones/gestion-devoluciones.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { AccesModuleComponent } from './acces-module/acces-module.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    /*FormGroup,
    FormControl, 
    Validators,*/
    MatTabsModule,
    MatFormFieldModule,
    MatCardModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    ProveedoresComponent,
    MarcasComponentComponent,
    MediosDePagoComponent,
    TipoOfertaComponent,
    EventoOfertaComponent,
    PuntoCompraComponent,
    PlazoCreditoComponent,
    TipoVentajaComponent,
    GestionDevolucionesComponent,
    AccesModuleComponent

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
