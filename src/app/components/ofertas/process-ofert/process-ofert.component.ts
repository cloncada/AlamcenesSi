import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExcelService } from '../../../services/excel/excel.service';
import { ToastrService } from 'ngx-toastr';
import { Oferta } from '../../../models/ofertas';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-process-ofert',
  templateUrl: './process-ofert.component.html',
  styleUrls: ['./process-ofert.component.css']
})

export class ProcessOfertComponent implements OnInit {
  oferta: Oferta = null;
  oferta2: Oferta = null;
  idMotorOferta: string;
  idOferta: string;
  regions: any = [];
  habilitarProcesar : boolean = true;

  constructor(private http: HttpClient, private excelSrv: ExcelService, private toast: ToastrService, private route: ActivatedRoute) { }
  baseUrl: string = environment.apiUrl;
  ngOnInit(): void {
    this.idOferta = this.route.snapshot.paramMap.get('id');
    this.http.get(this.baseUrl + 'oferta/findOfertaByID?id=' + this.idOferta)
      .subscribe(eventNames => {
        this.oferta2 = eventNames["data"];
        this.oferta = eventNames["data"];
      });

    //Regiones
    this.http.get(this.baseUrl + 'region')
      .subscribe(regions => {
        this.regions = regions["data"];
        var sucursales = this.oferta["sucursales"].split(" - ");
        this.regions.forEach(element => {
          element.sucursales.forEach(sucursal => {
            const found = sucursales.find(element => element == sucursal.codigo);
            if (found != undefined) sucursal["check"] = true;
          });
        });
      });
  }

  
  onProcessProcesar(evt: any) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({ id_motor_promociones: this.oferta.idOferta, id_oferta: this.oferta.id });
    Swal.fire({
      title: 'Procesar Oferta',
      text: "¿Está seguro de procesar la oferta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Procesar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.habilitarProcesar = false;
        this.http.patch<any>(this.baseUrl + 'oferta/process?id_motor_promociones=' + this.oferta.idOferta + '&id_oferta=' + this.oferta.id, '', { 'headers': headers })
        .subscribe(
          response => {
            Swal.fire('','Oferta procesada con éxito','success');
            setTimeout(() => {
              window.location.href = "/ofertas";
            }, 1000);
          },
          error => {
            console.log(error);
            Swal.fire('',error.error.message,'error');
          });
      }
    })
    
  }

  onProcessEditar(evt: any) {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify({ id_motor_promociones: this.oferta.idOferta, id_oferta: this.oferta.id });
    Swal.fire({
      title: 'Modificar Oferta',
      text: "¿Está seguro de modificar el id de motor de la oferta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Modificar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.habilitarProcesar = false;
        this.http.patch<any>(this.baseUrl + 'oferta/updatePromotionEngineId?id_motor_promociones=' + this.oferta.idOferta + '&id_oferta=' + this.oferta.id, '', { 'headers': headers })
        .subscribe(
          response => {
            Swal.fire('','Id Motor de Oferta modificado con éxito','success');
            setTimeout(() => {
              window.location.href = "/ofertas";
            }, 1000);
          },
          error => {
            console.log(error);
            Swal.fire('',error.error.message,'error');
          });
      }
    })
    
  }
  
  onProcessModificar(evt: any) {
      const headers2 = { 'content-type': 'application/json' }
      this.oferta2.totalVentaUnidades = this.oferta.totalVentaUnidades;
      this.oferta2.totalVentaDescuentos = this.oferta.totalVentaDescuentos;
      const body2 = JSON.stringify(this.oferta2);
      Swal.fire({
        title: 'Modificar Oferta',
        text: "¿Está seguro de modificar la oferta?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Modificar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.habilitarProcesar = false;
          //this.http.put<any>(this.baseUrl + 'oferta/' , body2, { 'headers': headers2 })
          this.http.patch<any>(this.baseUrl + 'oferta/setFinalValues?total_venta_descuentos=' + this.oferta.totalVentaDescuentos + '&total_venta_unidades=' + this.oferta.totalVentaUnidades+ '&id_oferta=' + this.oferta.id, '', { 'headers': headers2 })
          .subscribe(
            response => {
              Swal.fire('','Oferta modificada con éxito','success');
              setTimeout(() => {
                window.location.href = "/ofertas";
              }, 1000);
            },
            error => {
              console.log(error);
              Swal.fire('',error.error.message,'error');
            });
        }
      })
  }
  exportData(tableId: string) {
    this.excelSrv.exportToFile("eanes-" + this.oferta.id, tableId);
    setTimeout(() => this.toast.success("EANES exportados con éxito", "",));
  }

}
