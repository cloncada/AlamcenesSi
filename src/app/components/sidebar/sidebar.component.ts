import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    method: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/areas', title: 'Areas',  icon:'ui-1_bell-53', class: '',method:"" },

  //{ path: '/add-oferta', title: 'Ofertas',  icon:'design_app', class: '' }
    /*{ path: '/dashboard', title: 'Dashboard',  icon: 'design_app', class: '' },
    /*,
    { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'users_single-02', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' }*/

];
export const ROUTESOFERTA: RouteInfo[] = [  
  { path: '/tabla', title: 'Tabla',  icon:'design_bullet-list-67', class: '',method:" " },
  


 


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  menu:boolean= false;
  ofertas:any[];
  constructor(private router: Router) { }
  logIn:any;
  ngOnInit() {
    
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.ofertas=ROUTESOFERTA.filter(menuItem => menuItem);
    this.logIn=localStorage.getItem("UserIn");
    
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  }
  showMenu(){
    this.menu=!this.menu;

  }
  logOut(){


    localStorage.setItem('UserIn',"0");
    this.logIn=0;
   
   this.router.navigate([""]);
   
  }

}
