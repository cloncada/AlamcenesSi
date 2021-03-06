import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AreasComponent } from '../../areas/areas.component'; 

import { OfertasListComponent } from '../../components/ofertas/ofertas-list/ofertas-list.component';
import { AddOfertaComponent } from '../../components/ofertas/add-oferta/add-oferta.component';
import { OfertaDetailsComponent } from '../../components/ofertas/oferta-details/oferta-details.component';
import { ProcessOfertComponent } from '../../components/ofertas/process-ofert/process-ofert.component';
import { GestionDevolucionesComponent } from '../../gestion-devoluciones/gestion-devoluciones.component';
import { AccesModuleComponent } from '../../acces-module/acces-module.component';

export const AdminLayoutRoutes: Routes = [
    /*,
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },*/


    { path: 'tabla', component: AreasComponent },
    { path: 'gestion-devoluciones', component: GestionDevolucionesComponent },
    { path: 'login', component: AccesModuleComponent }



];
