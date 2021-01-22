import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PuntoCompraServiceService {



  url=environment.apiUrl+"pop";
   


  constructor(private http: HttpClient) {    

  }
  getPuntosCompra(){

    return this.http.get(this.url+"/findAll");

      }
  addPuntoCompra(puntoCompra){

return this.http.post(this.url,puntoCompra);

  }
  deletePuntoCompra(puntoCompraCode){
return this.http.delete(this.url+"/"+puntoCompraCode);

  }
  updatePuntoCompra(puntoCompra:any){
    return this.http.put(this.url+"/",puntoCompra);

  }
}
