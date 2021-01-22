import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Deal } from '../../../models/deals';
import { Department } from '../../../models/departments';
import { Oferta } from '../../../models/ofertas';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Group } from '../../../models/groups';
import { Category } from '../../../models/categories';
import { Subcategory } from '../../../models/subcategories';
import { ResponseOfert } from '../../../models/responseOferts';
import { Ean } from '../../../models/eans';
import { ExcelService } from '../../../services/excel/excel.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { strict } from 'assert';
import { cleanData } from 'jquery';
import { Console } from 'console';

declare var $: any;



@Component({
  selector: 'app-add-oferta',
  templateUrl: './add-oferta.component.html',
  styleUrls: ['./add-oferta.component.css']
})
export class AddOfertaComponent implements OnInit {
  constructor(private http: HttpClient, private excelSrv: ExcelService,private toast: ToastrService) {}

  oferta: Oferta = {
    deal : null,
    department : null,
    group : null,
    category : null,
    subcategory : null, 
    codigosSucursales:''
  };

  eventNames: any = [];

  commercialStructure: Deal[];

  buyers: any = [];
  payments: any = [];
  regions : any = [];
  ofertsType : any [];
  providers: any [];
  providerPayments: any [];
  creditTerms: any [];
  pops: any[];
  brands: any[];
  advantagesType: any[];
  respuesta : ResponseOfert;
  importContacts: Ean[] = [];
  checkTodos : boolean = false;


  baseUrl : string = environment.apiUrl;
  ngOnInit(): void {
  
    //Nombres de Eventos
    this.http.get( this.baseUrl + 'eventooferta/findByEstado?estado=true')
    .subscribe(eventNames => {
      this.eventNames = eventNames["object"];
    });

     //Arbol de estructura comercial
     this.http.get( this.baseUrl + 'estructuracomercial/arbol')
     .subscribe(arbol => {
       this.commercialStructure = arbol["data"];
     });

     //Comprador
     this.http.get( this.baseUrl + 'comprador/findByEstado?estado=true')
     .subscribe(buyers => {
       this.buyers = buyers["data"];
     });

     //Medio de Pago
     this.http.get( this.baseUrl + 'mediopago/findByEstado?estado=true')
     .subscribe(payments => {
       this.payments = payments["object"];
     });

      //Regiones
      this.http.get( this.baseUrl + 'region')
      .subscribe(regions => {
        this.regions = regions["data"];
        this.regions.forEach(function(e){
          if (typeof e === "object" ){
            e["check"] = false;
          }
        });
      });

      //Tipo Ofertas.
      this.http.get( this.baseUrl + 'tipooferta/findByEstado?estado=true')
      .subscribe(oferts => {
        this.ofertsType = oferts["object"];
      });

      //Proveedor
      this.http.get( this.baseUrl + 'proveedor/findByEstado?estado=true')
      .subscribe(provider => {
        this.providers = provider["object"];
      });

       //Forma pago Proveedor
       this.http.get( this.baseUrl + 'formapagoproveedor/findByEstado?estado=true')
       .subscribe(providerPayments => {
         this.providerPayments = providerPayments["object"];
       });

        //Plazo credito
        this.http.get( this.baseUrl + 'plazocredito/findByEstado?estado=true')
        .subscribe(plazos => {
          this.creditTerms = plazos["object"];
        });

        //Plazo credito
        this.http.get( this.baseUrl + 'pop/findByEstado?estado=true')
        .subscribe(pops => {
          this.pops = pops["object"];
        });

        
        //Marca
        this.http.get( this.baseUrl + 'marca/findByEstado?estado=true')
        .subscribe(brands => {
          this.brands = brands["object"];
        });

        //Tipo Ventaja.
      this.http.get( this.baseUrl + 'tipoventaja/findByEstado?estado=true')
      .subscribe(advantages => {
        this.advantagesType = advantages["object"];
      });
  }
  @ViewChild('fileUploader') fileUploader:ElementRef;
  resetFileUploader() { 
    this.fileUploader.nativeElement.value = null;
  }

  submitted = false;
  nuevaOferta : Oferta;
  onSubmit(evt: any) {
    this.oferta.codigoNegocio = this.oferta.deal.negocio;
    this.oferta.codigoDepartamento = this.oferta.department.departamento.toString();
    this.oferta.codigoGrupo = this.oferta.group.grupo.toString();
    this.oferta.codigoCategoria = this.oferta.category.categoria.toString();
    this.oferta.codigoSubcategoria = this.oferta.subcategory.subcategoria.toString();

    this.nuevaOferta = Object.assign({}, this.oferta);
    var fechaDesde = this.nuevaOferta.fechaInicio.split('-');
    this.nuevaOferta.fechaInicio = fechaDesde[2] + "/" + fechaDesde[1] + "/" + fechaDesde[0];
    var fechaHasta = this.nuevaOferta.fechaFin.split('-');
    this.nuevaOferta.fechaFin = fechaHasta[2] + "/" + fechaHasta[1] + "/" + fechaHasta[0];
    //this.nuevaOferta.codigosSucursales = this.nuevaOferta.codigosSucursales.substring(3);
    //let dateString = '2015-10-06'  
    delete this.nuevaOferta.deal;
    delete this.nuevaOferta.department;
    delete this.nuevaOferta.group;
    delete this.nuevaOferta.category;
    delete this.nuevaOferta.subcategory;

    if(this.nuevaOferta.eans == undefined || this.nuevaOferta.eans.length <= 0 ){
      Swal.fire('',"Lista de Eanes es requerida",'error');
      return;
    }

    const headers = { 'content-type': 'application/json'}  
    const body = JSON.stringify(this.nuevaOferta);

    Swal.fire({
      title: 'Crear Oferta',
      text: "¿Está seguro de crear la oferta?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Guardar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.post<ResponseOfert>(this.baseUrl + 'oferta/', body,{'headers':headers})
        .subscribe(
          response =>{
            this.respuesta = response;
            Swal.fire('','Oferta Creada con éxito','success');
            setTimeout(() => {
              window.location.href ="/ofertas";
            }, 2000);
          } ,
          error => {
            console.log(error);
            Swal.fire('',error.error.message,'error');
        });
      }
    })


  }
  newHero() {
    Swal.fire({
      title: 'Limpiar Información',
      text: "¿Está seguro de limpiar la información ingresada?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Limpiar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.oferta = new Oferta();
        this.cleanRegions();
        Swal.fire(
          '',
          'La información ingresada ha sido limpiada',
          'success'
        )
      }
    })
  }
  onClearRegions(){ 
    this.cleanRegions();
  }
  cleanRegions(){
    this.regions.forEach(region => {
      region["check"] = false;
      region.sucursales.forEach(sucursal => {
          sucursal["check"] = false;
      });
    });
    this.checkTodos = false;
  }
  onDealChange() {
    this.oferta.department = null;
    this.oferta.group = null;
    this.oferta.category = null;
  }
  onDepartmentChange(){
    this.oferta.group = null;
    this.oferta.category = null;
  }
  onGroupChange(){
    this.oferta.category = null;
  }
  onCategoryChange(){
    this.oferta.subcategory = null;
  }



  onCheckboxChangeRegionAll(event){
    this.regions.forEach(region => {
        region["check"] = event.target.checked;
        this.onCheckboxChangeRegion(region.codigo, event)
    });
  }

  onCheckboxChangeRegion(option, event){
    var filtro = option != "TODOS" ;
    this.regions.forEach(element => {
      if(!filtro || (filtro && element.codigo == option )){
        element["check"] = event.target.checked;
        element.sucursales.forEach(sucursal => {
          sucursal["check"] = event.target.checked;
          this.onCheckboxChange(sucursal, null);
        });
      }
    });
  }

  onCheckboxChange(option, event) {
    var sucursalesArray = [];
    this.regions.forEach(region => {
      region.sucursales.forEach(sucursal => {
        if(event != null) 
          if(option.codigo == sucursal.codigo) 
            sucursal["check"] = event.target.checked;
        if(sucursal.check){
          sucursalesArray.push(sucursal.codigo);
        }
      });
    });
    this.oferta.codigosSucursales = sucursalesArray.join(" - "); 
    console.log(this.oferta.codigosSucursales);
  }

  onDeleteEan(codigo){
    Swal.fire({
      title: 'Quitar Ean',
      text: "¿Está seguro de quitar el Ean con la referencia: "+codigo+"?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Quitar!'
    }).then((result) => {
      if (result.isConfirmed) {
        for(var i = 0; i < this.oferta.eans.length; i++) {
            if(this.oferta.eans[i].referencia == codigo) {
              this.oferta.eans.splice(i, 1);
                break;
            }
        }
        Swal.fire(
          '',
          'Ean quitado con éxito',
          'success'
        )
      }
    });
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;
}

  repetidos = ar => ar.filter (
    //var i = arr.map(function(e) { return e.ean; }).indexOf(item.ean);
    (value,pos,self) => self.slice(pos+1).map(function(e) { return e.ean; }).indexOf(value.ean) >= 0 && pos === self.map(function(e) { return e.ean; }).indexOf(value.ean)
  );

  validateData(datos){
    var mensaje = "";
    var conErrores = [];
    let hash = {};
    var x = this.repetidos(this.oferta.eans);
    console.log(x);
    this.oferta.eans = this.oferta.eans.filter(o => hash[o.ean] ? false : hash[o.ean] = true);

    this.oferta.eans.forEach(element => {
      var elementMessage = "";
      if(element.ean == undefined){
        conErrores.push(element);
      }else{
        if(isNaN(element.ean) || !element.referencia  || !element.descripcion || !element.marca ){

          elementMessage += "Ean: " + element.ean + " => ";

          if(isNaN(element.ean)){
            elementMessage += "ean - ";
          }
          if(!element.referencia){
            elementMessage += "Referencia - ";
          }
          if(!element.descripcion){
            elementMessage += "descripcion - ";
          }
          if(!element.marca){
            elementMessage += "marca - ";
          }

          elementMessage += "No tiene(n) el formato correcto";
          conErrores.push(element);
          mensaje += elementMessage + "<br>";
        }
      }
    });
    conErrores.forEach(element => {
      this.removeItemFromArr(this.oferta.eans, element);
    });

    if(x.length > 0){
      mensaje += "\n***Se quitaron valores duplicados";
    }
    /*if(conErrores.length > 0){
      Swal.fire(mensaje, '', 'warning')
    }*/
    
    return mensaje;
  }

  removeItemFromArr = ( arr, item ) => {
    var i = arr.map(function(e) { return e.ean; }).indexOf(item.ean);
    i !== -1 && arr.splice( i, 1 );
  };

   cleanArray( actual ){
    var newArray = new Array();
    for( var i = 0, j = actual.length; i < j; i++ ){
        if ( actual[ i ].ean ){
          newArray.push( actual[ i ] );
      }
    }
    return newArray;
  }

  onFileChange(evt: any) {
    if(this.oferta.eans == undefined) this.oferta.eans = [];
    if (evt.target.files && evt.target.files[0]) {}
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {

      const bstr: string = e.target.result;
      const data = <any[]>this.excelSrv.importFromFile(bstr);
      const header: string[] = data[0];
      const importedData = data.slice(1,data.length);
      var newInfo = [];
      importedData.forEach(element => {
        var entidad = {
          ean         : element[0],
          referencia  : element[1],
          descripcion : element[2],
          marca       : element[3],
          precioAntes : element[4],
          precioAhora : element[5],

          capacidadLibras        : element[6],
          medidaProducto         : element[7],
          tensionVoltaje         : element[8],
          tipoDeEnergia          : element[9],
          potencia               : element[10],
          medidaPantallaPulg     : element[11],
          modelo                 : element[12],
          cilindrajeCc           : element[13],
          motor                  : element[14],
          material               : element[15],
          tipoEquipo             : element[16],
          autonomia              : element[17],
          tallaMedida            : element[18],
          materialesDeElaboracion: element[19],
          tipoDeColchon          : element[20],
          materialDeLaBase       : element[21],
          sistemaOperativo       : element[22],
          procesadorComputadores : element[23],
          resolucion             : element[24]
        }
        newInfo.push(entidad);
      });
      newInfo = this.cleanArray(newInfo);
      if(this.oferta.eans.length > 0){
        Swal.fire({
          title: 'Ya tienes lista de Eanes Precargados, \n¿Que acción deseas realizar con los eanes importados?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Agregar`,
          denyButtonText: `Reemplazar`,
        }).then((result) => {
          if (result.isConfirmed) {
            var m = this.AppendEanes(newInfo);
            Swal.fire('Eanes agregados a la lista actual con éxito!', m, 'success')
          } else if (result.isDenied) {
            var m = this.ImportEanes(newInfo);
            Swal.fire('Nueva lista de Eanes Importada con éxito', m, 'success')
          }
          console.log(this.oferta.eans);
          
        })
      }else{
        var m = this.ImportEanes(newInfo);
        Swal.fire('Eanes Importados con éxito', m, 'success')
      }
    };
    reader.readAsBinaryString(target.files[0]);
    this.resetFileUploader();
  }

  AppendEanes(newData){
    this.oferta.eans = this.oferta.eans.concat(newData);
    return this.validateData(this.oferta.eans);
  }

  ImportEanes(newData){
    this.oferta.eans = newData;
    return this.validateData(this.oferta.eans);

  }

}
