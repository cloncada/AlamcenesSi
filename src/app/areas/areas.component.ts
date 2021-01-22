import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AreasServiceService } from '../services/areas-service.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  closeResult: string;
  month = null;
  area = { "codigo": "", "nombre": "", "estatus": true, "est": "" }
  user: any;
  roles: any;
  cad= "";
  constructor(private http: HttpClient, private modalService: NgbModal, private service: AreasServiceService,private router: Router) { }

  @ViewChild('closebutton') closebutton;
  setCode(code) { this.area.codigo = code.value; }
  setNombre(nombre) { this.area.nombre = nombre.value; }
  setEstatus(estatus) {
    if (estatus.value == "1") { this.area.estatus = true }

    else { this.area.estatus = false }
  }

  title = 'datatables';
  dtOptions: any = {};
  posts: any = [];
  dtTrigger: Subject<any> = new Subject();
  estado: any;

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      responsive: true,
      processing: false
    };


    this.service.getDevoluciones()
      .subscribe(posts => {
        this.posts = posts as string[];
        this.posts = this.posts;

        this.dtTrigger.next();
      },
        (error) => {
          alert(JSON.stringify(JSON.parse(JSON.stringify(error)).error.message));
          // this.alertService.error(JSON.stringify(error));
        });
        this.user = localStorage.getItem('User')
    this.user = JSON.parse(this.user);
    this.roles=this.user.role;
    for (let i=0; i<this.roles.length;i++){

      let name= this.roles[i].name;
    this.cad+=name+"," ;
      console.log(i);

    }
console.log(this.cad)
  }


  pasarProducto(product) {
    localStorage.setItem("producto", JSON.stringify(product));
    this.router.navigate(["gestion-devoluciones"]);
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
  logout(){

    this.router.navigate([""]);
  }
 
  

}
