import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExcelService } from '../../../services/excel/excel.service';
import { ToastrService } from 'ngx-toastr';
import { Oferta } from '../../../models/ofertas';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-oferta-details',
  templateUrl: './oferta-details.component.html',
  styleUrls: ['./oferta-details.component.css']
})
export class OfertaDetailsComponent implements OnInit {
  oferta: Oferta = null;
  idMotorOferta : string;
  idOferta: string;
  regions : any = [];
  constructor(private http: HttpClient, private excelSrv: ExcelService,private toast: ToastrService, private route: ActivatedRoute) { }
  baseUrl : string = environment.apiUrl;
  ngOnInit(): void {
    this.idOferta = this.route.snapshot.paramMap.get('id');
    console.log(this.idOferta); 
    //Nombres de Eventos
    this.http.get( this.baseUrl + 'oferta/findOfertaByID?id='+this.idOferta)
    .subscribe(eventNames => {
      this.oferta = eventNames["data"];
      this.http.get( this.baseUrl + 'region')
      .subscribe(regions => {
        this.regions = regions["data"];
        var sucursales = this.oferta["sucursales"].split(" - "); 
        this.regions.forEach(element => {
          element.sucursales.forEach(sucursal => {
           const found = sucursales.find(element => element == sucursal.codigo);
           if(found != undefined)sucursal["check"] = true;
          });
        });
      });
      //console.log(this.oferta);
      
    });

     //Regiones
     /*this.http.get( this.baseUrl + 'region')
     .subscribe(regions => {
       this.regions = regions["data"];
       var sucursales = this.oferta["sucursales"].split(" - "); 
       this.regions.forEach(element => {
         element.sucursales.forEach(sucursal => {
          const found = sucursales.find(element => element == sucursal.codigo);
          if(found != undefined)sucursal["check"] = true;
         });
       });
     });*/
  }

  onProcess(evt: any){
    const headers = { 'content-type': 'application/json'}  
    //const body = JSON.stringify(this.nuevaOferta);
    const body = JSON.stringify({id_motor_promociones: this.oferta.idOferta, id_oferta  : this.oferta.id});
    console.log(body)
    this.http.patch<any>(this.baseUrl + 'oferta/process?id_motor_promociones='+this.oferta.idOferta+'&id_oferta='+this.oferta.id,'',{'headers':headers})
    .subscribe(
      response =>{
        //this.respuesta = response;
        console.log(response);
        setTimeout(() => this.toast.success("Oferta procesada con éxito"));
        setTimeout(() => {
         window.location.href ="/ofertas";
        }, 2000);
      } ,
      error => {
         console.log(error);
         //alert(error.error.message);
         setTimeout(() => this.toast.info(error.error.message));
    });
  }
  exportData(tableId: string) {
    this.excelSrv.exportToFile("eanes-"+this.oferta.id, tableId);
    setTimeout(() => this.toast.success("EANES exportados con éxito","",));
  }

}
