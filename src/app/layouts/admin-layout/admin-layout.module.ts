import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from 'angular-datatables';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AreasComponent } from '../../areas/areas.component';
import { OfertasListComponent } from '../../components/ofertas/ofertas-list/ofertas-list.component';
import { AddOfertaComponent } from '../../components/ofertas/add-oferta/add-oferta.component';
import { OfertaDetailsComponent } from '../../components/ofertas/oferta-details/oferta-details.component';
import { ProcessOfertComponent } from '../../components/ofertas/process-ofert/process-ofert.component';
import { FormsModule } from '@angular/forms'; 
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    ChartsModule,
    NgbModule,
    DataTablesModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    NgSelect2Module
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    AreasComponent,
    OfertasListComponent,
    AddOfertaComponent,
    OfertaDetailsComponent,
    ProcessOfertComponent
  ]
})

export class AdminLayoutModule {}
