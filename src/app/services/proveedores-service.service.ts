import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProveedoresServiceService {
url=environment.apiUrl;
  constructor(private http: HttpClient) { }

  getProveedores(){

return this.http.get(this.url+"proveedor");

  }
  addProveedor(proveedor:any){
return this.http.post(this.url+"proveedor/",proveedor);


  }
  updateProveedor(proveedor:any){

    return this.http.put(this.url+"proveedor/",proveedor);

  }
  deleteProveedor(codigo:any){


    return this.http.delete(this.url+"proveedor/"+codigo);
  }

}
