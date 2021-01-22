import { Component, OnInit } from '@angular/core';
import { from, Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventoOfertaServiceService } from "../services/evento-oferta-service.service";
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-evento-oferta',
  templateUrl: './evento-oferta.component.html',
  styleUrls: ['./evento-oferta.component.css']
})

export class EventoOfertaComponent implements OnInit {
  month = null;
  eventoOferta = { "codigo": "", "nombre": "", "estado": true, "est": "","fechaInicio":"","fechaFin":"","diasLimite":"" }
  setCodigo(code) { this.eventoOferta.codigo = code.value; }
  setNombre(nombre) { this.eventoOferta.nombre = nombre.value; }
  setEstatus(estatus) {
    
    if (estatus.value == "1") { this.eventoOferta.estado = true }

    else { this.eventoOferta.estado = false }

  }
  setFechaInicio(fechaInicio){
    
    this.eventoOferta.fechaInicio=fechaInicio.value;
    }
  setFechaFin(fechaFin){this.eventoOferta.fechaFin=fechaFin.value}
  setDiasLimite(diasLimite){this.eventoOferta.diasLimite=diasLimite.value}
  constructor(private service: EventoOfertaServiceService, private modalService: NgbModal,public datepipe: DatePipe) { }
  posts: any = [];
  closeResult: string;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      responsive: true,
      processing: false
    };
    this.service.getEventoOferta()
      .subscribe(posts => {
        this.posts = posts as string[];
        this.posts = this.posts.object;
        console.log(posts);
        this.dtTrigger.next();
      },
      (error) => {
        alert(JSON.stringify(JSON.parse(JSON.stringify(error)).error.message));
        // this.alertService.error(JSON.stringify(error));
      });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  open(content: any) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  onSubmit() {
    var fechaDesde = this.eventoOferta.fechaInicio.split('-');
    this.eventoOferta.fechaInicio = fechaDesde[2] + "/" + fechaDesde[1] + "/" + fechaDesde[0];
    var fechaHasta = this.eventoOferta.fechaFin.split('-');
    this.eventoOferta.fechaFin = fechaHasta[2] + "/" + fechaHasta[1] + "/" + fechaHasta[0];

    console.log(this.eventoOferta);
    this.service.addEventoOferta(this.eventoOferta).subscribe(data => {
      window.location.reload();
      Swal.fire({
        title: 'Añadida Evento OFerta  ' + this.eventoOferta.nombre,
        text: 'Se añadio! ' + this.eventoOferta.nombre,
        icon: 'success',
        showConfirmButton: false,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Aceptar',

      })
    },
    (error) => {
      alert(JSON.stringify(JSON.parse(JSON.stringify(error)).error.message));
      // this.alertService.error(JSON.stringify(error));
    });



  }
  onEdit() {
    
    var fechaDesde = this.eventoOferta.fechaInicio.split('-');
    this.eventoOferta.fechaInicio = fechaDesde[2] + "/" + fechaDesde[1] + "/" + fechaDesde[0];
    var fechaHasta = this.eventoOferta.fechaFin.split('-');
    this.eventoOferta.fechaFin = fechaHasta[2] + "/" + fechaHasta[1] + "/" + fechaHasta[0];
    
    let eventOferta=this.eventoOferta;

   this.service.updateEventoOferta(eventOferta).subscribe(data => {
    console.log(eventOferta);
      Swal.fire({
        title: 'Actualizada Evento oferta  ' + this.eventoOferta.nombre,
        text: 'Se añadio! ' + this.eventoOferta.nombre,
        icon: 'success',
        showConfirmButton: false,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Aceptar',

      })
     window.location.reload();
      
    },
   (error) => {
      alert(JSON.stringify(JSON.parse(JSON.stringify(error)).error.message));
      // this.alertService.error(JSON.stringify(error));
    });

    this.service.updateEventoOferta(this.eventoOferta).subscribe(data => {


    });;



  }
  openEdit(content: any, post: any) {
    var fechaDesde = post.fechaInicio.split('/');    
    let fechaInicio= fechaDesde[2] + "-" + fechaDesde[1] + "-" + fechaDesde[0];
    var fechaHasta = post.fechaFin.split('/');
    let fechaFin = fechaHasta[2] + "-" + fechaHasta[1] + "-" + fechaHasta[0];  
    
    console.log(fechaFin,fechaInicio);
   
    this.eventoOferta.codigo = post.codigo;
    this.eventoOferta.nombre = post.nombre;
    this.eventoOferta.estado = post.estado;
    this.eventoOferta.diasLimite=post.diasLimite;
    this.eventoOferta.fechaFin=fechaFin;
    this.eventoOferta.fechaInicio=fechaInicio;
    if (this.eventoOferta.estado == true) { this.eventoOferta.est = "Activo" } else { this.eventoOferta.est = "Inactivo" }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  borrarEventoOferta(codigo: any) {

    Swal.fire({
      title: 'Eliminar Evento Oferta con codigo ' + codigo,
      text: '¿De verdad desea eliminar ' + codigo + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.value) {
        this.service.deleteEventoOferta(codigo).subscribe(data => {

          Swal.fire(
            {
              title: 'Se ha elimidado el evento de oferta      ' + this.eventoOferta.nombre,
              text: 'Se Elimino! ' + this.eventoOferta.nombre,
              icon: 'success',
              showConfirmButton: true,
              confirmButtonColor: '#d33',
              confirmButtonText: 'Aceptar',

            }

          ).then((res) => {
            if (res.value) { window.location.reload(); }

          })

        }, (error) => {
          alert(JSON.stringify(JSON.parse(JSON.stringify(error)).error.message));
          // this.alertService.error(JSON.stringify(error));
        });


      }
      
    })

   
  }
}

