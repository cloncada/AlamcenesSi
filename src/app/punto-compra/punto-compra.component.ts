import { Component, OnInit } from '@angular/core';
import { from, Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PuntoCompraServiceService } from "../services/punto-compra-service.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-punto-compra',
  templateUrl: './punto-compra.component.html',
  styleUrls: ['./punto-compra.component.css']
})
export class PuntoCompraComponent implements OnInit {
  month = null;
  puntoCompra = { "codigo": "", "nombre": "", "estado": true, "est": "" }
  setCodigo(code) { this.puntoCompra.codigo = code.value; }
  setNombre(nombre) { this.puntoCompra.nombre = nombre.value; }
  setEstatus(estatus) {
    if (estatus.value == "1") { this.puntoCompra.estado = true }

    else { this.puntoCompra.estado = false }
  }
  constructor(private service: PuntoCompraServiceService, private modalService: NgbModal) { }
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
    this.service.getPuntosCompra()
      .subscribe(posts => {
        this.posts = posts as string[];
        this.posts = this.posts.object;
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

    this.service.addPuntoCompra(this.puntoCompra).subscribe(data => {
      window.location.reload();
      Swal.fire({
        title: 'Añadida Punto Compra  ' + this.puntoCompra.nombre,
        text: 'Se añadio! ' + this.puntoCompra.nombre,
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
    this.service.updatePuntoCompra(this.puntoCompra).subscribe(data => {
      window.location.reload();
      Swal.fire({
        title: 'Actualizada Punto de compra  ' + this.puntoCompra.nombre,
        text: 'Se añadio! ' + this.puntoCompra.nombre,
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

    this.service.updatePuntoCompra(this.puntoCompra).subscribe(data => {


    });;



  }
  openEdit(content: any, post: any) {
    this.puntoCompra.codigo = post.codigo;
    this.puntoCompra.nombre = post.nombre;
    this.puntoCompra.estado = post.estado;
    if (this.puntoCompra.estado == true) { this.puntoCompra.est = "Activo" } else { this.puntoCompra.est = "Inactivo" }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  borrarPuntoCompra(codigo: any) {

    Swal.fire({
      title: 'Eliminar punto de compra con codigo ' + codigo,
      text: '¿De verdad desea eliminar ' + codigo + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.value) {
        this.service.deletePuntoCompra(codigo).subscribe(data => {
  
          Swal.fire(
            {
              title: 'Se ha elimidado el punto de compra ' + this.puntoCompra.nombre,
              text: 'Se Elimino! ' + this.puntoCompra.nombre,
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
