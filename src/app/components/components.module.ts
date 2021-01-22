import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
//import { ProcessOfertComponent } from './ofertas/process-ofert/process-ofert.component';
//import { AddTutorialComponent } from './ofertas/add-tutorial/add-tutorial.component';
//import { AddOfertaComponent } from './ofertas/add-oferta/add-oferta.component';
//import { OfertaDetailsComponent } from './ofertas/oferta-details/oferta-details.component';
//import { OfertasListComponent } from './ofertas/ofertas-list/ofertas-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    //ProcessOfertComponent,
   // AddTutorialComponent,
    //AddOfertaComponent,
    //OfertaDetailsComponent,
    //OfertasListComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
