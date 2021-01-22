import { Component, OnInit } from '@angular/core';
import { PlazoCreditoServiceService } from '../services/plazo-credito-service.service';
import { from, Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-plazo-credito',
  templateUrl: './plazo-credito.component.html',
  styleUrls: ['./plazo-credito.component.css']
})
export class PlazoCreditoComponent implements OnInit {

  month = null;
  plazoCredito = { "codigo": "", "nombre": "", "estado": true, "est": "" }
  setCodigo(code) { this.plazoCredito.codigo = code.value; }
  setNombre(nombre) { this.plazoCredito.nombre = nombre.value; }
  setEstatus(estatus) {
    if (estatus.value == "1") { this.plazoCredito.estado = true }

    else { this.plazoCredito.estado = false }
  }
  constructor(private service: PlazoCreditoServiceService, private modalService: NgbModal) { }
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
    this.service.getPlazosCredito()
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

    this.service.addPlazoCredito(this.plazoCredito).subscribe(data => {
      window.location.reload();
      Swal.fire({
        title: 'Añadida Plazo Credito  ' + this.plazoCredito.nombre,
        text: 'Se añadio! ' + this.plazoCredito.nombre,
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
    this.service.updatePlazoCredito(this.plazoCredito).subscribe(data => {
      window.location.reload();
      Swal.fire({
        title: 'Actualizada Plazo Credito  ' + this.plazoCredito.nombre,
        text: 'Se añadio! ' + this.plazoCredito.nombre,
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

    this.service.updatePlazoCredito(this.plazoCredito).subscribe(data => {


    });;



  }
  openEdit(content: any, post: any) {
    this.plazoCredito.codigo = post.codigo;
    this.plazoCredito.nombre = post.nombre;
    this.plazoCredito.estado = post.estado;
    if (this.plazoCredito.estado == true) { this.plazoCredito.est = "Activo" } else { this.plazoCredito.est = "Inactivo" }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  borrarPlazoCredito(codigo: any) {

    Swal.fire({
      title: 'Eliminar Plazo Credito con codigo ' + codigo,
      text: '¿De verdad desea eliminar ' + codigo + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      
      if (result.value) {
      this.service.deletePlazoCredito(codigo).subscribe(data => {

        Swal.fire(
          {
            title: 'Se ha elimidado el plazo de credito  ' + this.plazoCredito.nombre,
            text: 'Se Elimino! ' + this.plazoCredito.nombre,
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
