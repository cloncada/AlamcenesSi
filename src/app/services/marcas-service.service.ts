import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MarcasServiceService {

  url=environment.apiUrl+"marca";



  constructor(private http: HttpClient) {    

  }
  getMarcas(){

    return this.http.get(this.url);

      }
  addMarca(marca){

return this.http.post(this.url+"/",marca);

  }
  deleteMarca(marcaCode){
return this.http.delete(this.url+"/"+marcaCode);

  }
  updateArea(marca:any){
    return this.http.put(this.url+"/",marca);

  }
}
