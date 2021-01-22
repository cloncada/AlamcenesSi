import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoVentajaServiceService {

  url=environment.apiUrl+"tipoventaja";



  constructor(private http: HttpClient) {    

  }
  getTipoVentaja(){

    return this.http.get(this.url+"/findAll");

      }
  addTipoVentaja(tipoVentaja){

return this.http.post(this.url+"/",tipoVentaja);

  }
  deleteTipoVentaja(marcaCode){
return this.http.delete(this.url+"/"+marcaCode);

  }
  updateTipoVentaja(tipoVentaja:any){
    return this.http.put(this.url+"/",tipoVentaja);

  }
}
