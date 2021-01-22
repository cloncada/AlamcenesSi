import { Component, OnInit } from '@angular/core';
import { from, Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TipoVentajaServiceService } from "../services/tipo-ventaja-service.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tipo-ventaja',
  templateUrl: './tipo-ventaja.component.html',
  styleUrls: ['./tipo-ventaja.component.css']
})
export class TipoVentajaComponent implements OnInit {

  month = null;
  marca = { "codigo": "", "nombre": "", "estado": true, "est": "" }
  setCodigo(code) { this.marca.codigo = code.value; }
  setNombre(nombre) { this.marca.nombre = nombre.value; }
  setEstatus(estado) {
    if (estado.value == "1") { this.marca.estado = true }

    else { this.marca.estado = false }
  }
  constructor(private service: TipoVentajaServiceService, private modalService: NgbModal) { }
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
    this.service.getTipoVentaja()
      .subscribe(posts => {
        this.posts = posts as string[];
        this.posts = this.posts.object;
        this.dtTrigger.next();
        console.log(this.posts);
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
    console.log(this.marca);
   

    this.service.addTipoVentaja(this.marca).subscribe(data => {
      window.location.reload();
      Swal.fire({
        title: 'Añadida tipo de ventaja  ' + this.marca.nombre,
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
    this.service.updateTipoVentaja(this.marca).subscribe(data => {
      window.location.reload();
      Swal.fire({
        title: 'Actualizada tipo de ventaja  ' + this.marca.nombre,
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

    this.service.updateTipoVentaja(this.marca).subscribe(data => {


    });;



  }
  openEdit(content: any, post: any) {
    this.marca.codigo = post.codigo;
    this.marca.nombre = post.nombre;
    this.marca.estado = post.estado;
    if (this.marca.estado == true) { this.marca.est = "Activo" } else { this.marca.est = "Inactivo" }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }


  borrarMarca(codigo: any) {

    Swal.fire({
      title: 'Eliminar tipo ventaja  con codigo ' + codigo,
      text: '¿De verdad desea eliminar ' + codigo + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.value) {
        this.service.deleteTipoVentaja(codigo).subscribe(data => {

          Swal.fire(
            {
              title: 'Se ha elimidado el tipo ventaja   ' + this.marca.nombre,
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
