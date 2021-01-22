import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MediosDePagoServiceService {

  url=environment.apiUrl+"mediopago";



  constructor(private http: HttpClient) {    

  }
  getMedios(){

    return this.http.get(this.url);

      }
  addMedio(medio){

return this.http.post(this.url+"/",medio);

  }
  deleteMedio(medioCode){
return this.http.delete(this.url+"/"+medioCode);

  }
  updateMedio(medio:any){
    return this.http.put(this.url+"/",medio);

  }
}
