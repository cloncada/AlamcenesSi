import { Component, OnInit } from '@angular/core';
import { AreasServiceService } from '../services/areas-service.service';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
@Component({
  selector: 'app-gestion-devoluciones',
  templateUrl: './gestion-devoluciones.component.html',
  styleUrls: ['./gestion-devoluciones.component.css']
})
export class GestionDevolucionesComponent implements OnInit {
  producto: any;
  items: any;
  index: any;
  status: any;
  bodega: boolean = false;
  notOnlyAnalist: boolean = true;
  analist: boolean = false;
  facturacion: boolean = false;
  onjectItem: [];
  roles = [];
  checkedItems = false;
  user: any;
  file:any;
  historyId:any;
  history:any;
  fechaCompra:any;
  fechaOrden:any;
  diasTranscurridos:any;
  actualizacion = {
    "uuid": "",
    "observation": "",
    "items": [
      {
        "id": "",
        "status": ""
      }
    ],
    "file":"",
    "userModified":"",
    "status": ""
  };
  generalStatus: any;
  setEstatus(estatus, i) {
  
    if (estatus.value == "1") { this.items[i].status = "APROBADA"; this.checkedItems = true }

    else if (estatus.value == "2") { this.items[i].status = "RECHAZADO"; this.checkedItems = true }

  }
  setGeneralEstatus(estado) {

    if (estado.value == "1") { this.actualizacion.status = "FINALIZADO"; }

    else if (estado.value == "2") { this.actualizacion.status = "PRODUCTO_RECIBIDO"; }
    else if (estado.value == "3") { this.actualizacion.status = "NOVEDAD"; }


   
  }

  setObservacion(observacion) { this.actualizacion.observation = observacion.value }
  constructor(private service: AreasServiceService,private router: Router) { }
  month: any;
  onChange($event){
const file=($event.target as HTMLInputElement).files[0];

this.convertToBAse64(file);

  }
  convertToBAse64(file:File){

    const observable=new Observable((subscriber:Subscriber<any>)=>{
      this.readFile(file,subscriber);
    })
observable.subscribe((d)=>{
this.file=d;
console.log(this.file);
this.actualizacion.file=this.file;
  
})
  }
  readFile(file:File,subscriber:Subscriber<any>){

    const fileReader=new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload=()=>{

      subscriber.next(fileReader.result);
      subscriber.complete();
    }
    fileReader.onerror=(error)=>{

      subscriber.error(error);
      subscriber.complete();
    }
  }


  ngOnInit(): void {
   
    this.user = localStorage.getItem('User')
    this.user = JSON.parse(this.user);
    let roles = this.user.role;
    
    this.actualizacion.userModified=this.user.userName;
    if(roles!= null ){
      for (let i = 0; i < roles.length; i++) {
        this.roles.push(roles[i].name);  
      }


    }
    else{

      alert("usuarios sin roles asignados");


    }
    
    this.producto = JSON.parse(localStorage.getItem("producto"));
    this.items = this.producto.items;
    this.actualizacion.uuid = this.producto.uuid;
    this.historyId=this.producto.uuid;


    this.fechaCompra=new Date(this.producto.saleDto.date);
    this.fechaOrden=new Date(this.producto.date);
this.diasTranscurridos=this.fechaOrden-this.fechaCompra;
this.diasTranscurridos=this.diasTranscurridos/(1000 * 3600 * 24);
this.diasTranscurridos=this.diasTranscurridos.toFixed(0);
console.log(this.diasTranscurridos);
    this.service.getHistory(this.historyId).subscribe(posts => {
      this.history = posts as string[];
      this.history = this.history;      
      
     
    },
      (error) => {
        alert(JSON.stringify(JSON.parse(JSON.stringify(error)).error.message));
        // this.alertService.error(JSON.stringify(error));
      });



   


    if (this.roles.indexOf("ROLE_BODEGA") != -1) {
      if ( this.producto.status == "ESPERA_PRODUCTO") {
        this.bodega = true;


      }


    }
    if (this.roles.indexOf("ROLE_FACTURACION") != -1) {
      if (this.producto.status == "PRODUCTO_RECIBIDO" ||  this.producto.status == "CANCELADO" || this.producto.status == "NEGADA") {

        this.facturacion = true;

      }



    }

    if (this.roles.indexOf("ROLE_ANALISTA") != -1) {

      if (this.producto.status == "CREADA" || this.producto.status == "NOVEDAD") {
        this.analist = true;
        if (this.roles.length == 1) {
          this.notOnlyAnalist = false;


        }


      }


    }
    if (this.roles.indexOf("ADMIN") != -1) {



    }




  }

  onEdit() {
    var data = []
    let item = { "id": "", "status": "" }
    for (let i = 0; i < this.items.length; i++) {
      item.id = this.items[i].id;
      item.status = this.items[i].status;
      data.push(item);

    }
    this.actualizacion.items = data;
   

    var cont = 0;
    var cont2=0;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].status == "APROBADA") {

        cont += 1;
      }
      else if(this.items[i].status != "APROBADA"){

        cont2++;

      }
    }

    if (this.items.length > cont) {

      this.actualizacion.status = "APROBADA_PARCIALMENTE";

    }
    else {

      this.actualizacion.status = "APROBADA";
    }

    if (this.items.length == cont2) {

      this.actualizacion.status = "NEGADA";

    }



    if (this.actualizacion.observation == "") { alert("Agregue una observacion a la gestion") }
    else { this.service.actualizarEstado(this.actualizacion, this.actualizacion.status).subscribe();
      console.log(this.actualizacion);
      
      this.router.navigate(["tabla"]);
    
    }




  }
  tabla(){this.router.navigate(["tabla"]);}

  changeStatus() {

    this.actualizacion.file=this.file;
    var data = []
    
    this.actualizacion.items = data;
    let update= JSON.stringify(this.actualizacion);

    
    if (this.actualizacion.observation == "") { alert("Agregue una observacion a la gestion") }
    else if(this.facturacion==true){
        if(this.actualizacion.file==""){

          alert("adjuntar nota credito");
        }
        else{
          let update= JSON.stringify(this.actualizacion);

          if (this.actualizacion.status==""){
           this.actualizacion.status=this.producto.status;
           
     
          }
          
           this.service.actualizarEstado(this.actualizacion, this.actualizacion.status).subscribe();
        
           
           
           this.router.navigate(["table-list"])

          
        }


    }

    else {
     let update= JSON.stringify(this.actualizacion);

     if (this.actualizacion.status==""){
      this.actualizacion.status=this.producto.status;
      

     }
     
      this.service.actualizarEstado(this.actualizacion, this.actualizacion.status).subscribe();


      
      
      this.router.navigate(["table-list"]);
      
    }
  

  }
  logout(){

    this.router.navigate([""]);
  }
}