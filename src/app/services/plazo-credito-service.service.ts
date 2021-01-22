import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlazoCreditoServiceService {

  url=environment.apiUrl+"plazocredito/"; 


  constructor(private http: HttpClient) {    

  }
  getPlazosCredito(){

    return this.http.get(this.url+"findAll");

      }
  addPlazoCredito(plazocredito){

return this.http.post(this.url,plazocredito);

  }
  deletePlazoCredito(plazoCreditoCode){
return this.http.delete(this.url+plazoCreditoCode);

  }
  updatePlazoCredito(plazocredito:any){
    return this.http.put(this.url,plazocredito);

  }
}

