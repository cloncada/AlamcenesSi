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
    
    GestionDevolucionesComponent,
    AccesModuleComponent
 
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
