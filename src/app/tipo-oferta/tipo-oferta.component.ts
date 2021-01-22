import { Component, OnInit } from '@angular/core';
import { from, Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TipoOfertaServiceService } from "../services/tipo-oferta-service.service";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tipo-oferta',
  templateUrl: './tipo-oferta.component.html',
  styleUrls: ['./tipo-oferta.component.css']
})

export class TipoOfertaComponent implements OnInit {
  month = null;
  tipoOferta = { "codigo": "", "nombre": "", "estado": true, "est": "" }
  setCodigo(code) { this.tipoOferta.codigo = code.value; }
  setNombre(nombre) { this.tipoOferta.nombre = nombre.value; }
  setEstatus(estatus) {
    if (estatus.value == "1") { this.tipoOferta.estado = true }

    else { this.tipoOferta.estado = false }
  }
  constructor(private service: TipoOfertaServiceService, private modalService: NgbModal) { }
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
    this.service.getTipoOfertas()
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

    this.service.addTipoOferta(this.tipoOferta).subscribe(data => {
      window.location.reload();
      Swal.fire({
        title: 'Añadida Tipo de oferta  ' + this.tipoOferta.nombre,
        text: 'Se añadio! ' + this.tipoOferta.nombre,
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
    this.service.updateTipoOferta(this.tipoOferta).subscribe(data => {
      window.location.reload();
      Swal.fire({
        title: 'Actualizada tipo oferta  ' + this.tipoOferta.nombre,
        text: 'Se añadio! ' + this.tipoOferta.nombre,
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

    this.service.updateTipoOferta(this.tipoOferta).subscribe(data => {


    });;



  }
  openEdit(content: any, post: any) {
    this.tipoOferta.codigo = post.codigo;
    this.tipoOferta.nombre = post.nombre;
    this.tipoOferta.estado = post.estado;
    if (this.tipoOferta.estado == true) { this.tipoOferta.est = "Activo" } else { this.tipoOferta.est = "Inactivo" }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  borrarTipoOferta(codigo: any) {

    Swal.fire({
      title: 'Eliminar tipo oferta con codigo ' + codigo,
      text: '¿De verdad desea eliminar ' + codigo + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.value) {
        this.service.deleteTipoOFerta(codigo).subscribe(data => {
  
          Swal.fire(
            {
              title: 'Se ha elimidado la tipo de oferta ' + this.tipoOferta.nombre,
              text: 'Se Elimino! ' + this.tipoOferta.nombre,
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
