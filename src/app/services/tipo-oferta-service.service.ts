
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoOfertaServiceService {

  url=environment.apiUrl+"tipooferta";


  constructor(private http: HttpClient) {    

  }
  getTipoOfertas(){

    return this.http.get(this.url+"/findAll");

      }
  addTipoOferta(tipoOferta){

return this.http.post(this.url+"/",tipoOferta);

  }
  deleteTipoOFerta(marcaCode){
return this.http.delete(this.url+"/"+marcaCode);

  }
  updateTipoOferta(tipoOferta:any){
    return this.http.put(this.url+"/",tipoOferta);

  }
}
