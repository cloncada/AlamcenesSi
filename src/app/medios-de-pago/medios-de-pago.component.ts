import { Component, OnInit } from '@angular/core';
import { from, Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MediosDePagoServiceService } from "../services/medios-de-pago-service.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-medios-de-pago',
  templateUrl: './medios-de-pago.component.html',
  styleUrls: ['./medios-de-pago.component.css']
})
export class MediosDePagoComponent implements OnInit {
  estatus: string;
  month = null;
  marca = { "codigo": "", "nombre": "", "estatus": true, "est": "" }
  setCodigo(code) { this.marca.codigo = code.value; }
  setNombre(nombre) { this.marca.nombre = nombre.value; }
  setEstatus(estatus) {
    if (estatus.value == "1") {
      this.marca.estatus = true
    }

    else {
      this.marca.estatus = false;
      this.estatus = "inactivo"
    }
  }

  constructor(private service: MediosDePagoServiceService, private modalService: NgbModal) { }
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
    this.service.getMedios()
      .subscribe(posts => {
        this.posts = posts as string[];
        this.posts = this.posts.data;

        this.dtTrigger.next();
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

    this.service.addMedio(this.marca).subscribe(data => {
      window.location.reload();
      Swal.fire({
        title: 'Añadida marca  ' + this.marca.nombre,
        text: 'Se añadio! ' + this.marca.nombre,
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
    this.service.updateMedio(this.marca).subscribe(data => {

      
      Swal.fire({
        title: 'Actualizado medio de pago   ' + this.marca.nombre,
        text: 'Se añadio! ' + this.marca.nombre,
        icon: 'success',
        showConfirmButton: false,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Aceptar',

      })
    });

    window.location.reload();

  }
  openEdit(content: any, post: any) {
    this.marca.codigo = post.codigo;
    this.marca.nombre = post.nombre;
    this.marca.estatus = post.estatus;
    if (this.marca.estatus == true) { this.marca.est = "Activo" } else { this.marca.est = "Inactivo" }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  borrarMarca(codigo: any) {

    Swal.fire({
      title: 'Eliminar marca con codigo ' + codigo,
      text: '¿De verdad desea eliminar ' + codigo + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.value) {
        this.service.deleteMedio(codigo).subscribe(data => {

          Swal.fire(
            {
              title: 'Se ha elimidado el medio de pago  ' + this.marca.nombre,
              text: 'Se Elimino! ' + this.marca.nombre,
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
