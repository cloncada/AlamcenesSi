import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProveedoresServiceService } from '../../services/proveedores-service.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  proveedor = { "codigo": "", "razonSocial": "", "nit": "", "correo": "", "estatus": true, "est":"" }
  closeResult: string;
  month=null;
  constructor(private modalService: NgbModal, private service: ProveedoresServiceService) { }
  setCodigo(code) { this.proveedor.codigo = code.value; }
  setNombre(razonSocial) { this.proveedor.razonSocial = razonSocial.value; }
  setEstatus(estatus) {
    if (estatus.value == "1") { this.proveedor.estatus = true }

    else { this.proveedor.estatus = false }
  }
  setCorreo(correo) { this.proveedor.correo = correo.value; }
  setNit(nit) { this.proveedor.nit = nit.value; }
  posts: any = [];
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      responsive: true,
      processing: false
    };
    this.service.getProveedores()
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
  openEdit(content: any, post: any) {
    this.proveedor.codigo = post.codigo;
    this.proveedor.razonSocial = post.razonSocial;
    this.proveedor.nit = post.nit;
    this.proveedor.correo = post.correo;
    this.proveedor.estatus = post.estatus;
    if (this.proveedor.estatus == true) { this.proveedor.est = "Activo" } else { this.proveedor.est = "Inactivo" }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }
  onEdit() {

    this.service.updateProveedor(this.proveedor).subscribe(data => {

      window.location.reload();
      Swal.fire({
        title: 'Actualizado proveedor    '+this.proveedor.razonSocial,
        text: 'Se añadio! '+this.proveedor.razonSocial,
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
    }
    );



  }
  onSubmit() {
    this.service.addProveedor(this.proveedor).subscribe(data => {
      
      Swal.fire({
        title: 'Añadido proveedor  '+this.proveedor.razonSocial,
        text: 'Se añadio! '+this.proveedor.razonSocial,
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
  }
  borrarProveedor(codigo: any) {
    Swal.fire({
      title: 'Eliminar proveedor con codigo '+codigo,
      text: '¿De verdad desea eliminar '+ codigo+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      
      if (result.value) {
        this.service.deleteProveedor(codigo).subscribe(data => {
  
          Swal.fire(
            {
              title: 'Se ha elimidado el proveedor  ' + this.proveedor.razonSocial,
              text: 'Se Elimino! ' + this.proveedor.razonSocial,
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
