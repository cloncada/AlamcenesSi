import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoOfertaServiceService {
  url=environment.apiUrl+"eventooferta";  


  constructor(private http: HttpClient) {    

  }
  getEventoOferta(){

    return this.http.get(this.url+"/findAll");

      }
  addEventoOferta(tipoOferta){

return this.http.post(this.url+"/",tipoOferta);

  }
  deleteEventoOferta(eventoCode){
return this.http.delete(this.url+"/"+eventoCode);

  }
  updateEventoOferta(tipoOferta:any){
    return this.http.put(this.url+"/",tipoOferta);

  }
}
