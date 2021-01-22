import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AreasServiceService {
url="http://192.168.1.135:9001/repayment";

authUrl="http://192.168.1.135:9001/repayment/api/user/login?user=";

  constructor(private httpClient: HttpClient) {    

  }
  getDevoluciones(){

    return this.httpClient.get(this.url+"/api/repayment/all");

      }
      actualizarEstado(actualizacion:any,status:any){
        return this.httpClient.put("http://192.168.1.135:9001/repayment/api/repayment/update/"+status,actualizacion)
    
    
      }

      getHistory(id){
        return this.httpClient.get("http://192.168.1.135:9001/repayment/api/repayment/getHistory/"+id);
        
        
          }

          //url="http://192.168.1.135:9001/repayment/api/user/login?user=carlos.moncada&password=5839ecdfd43bc7467f77cba4a40ea64c8ee5f986f61cf16a0e024ed2225891a4";



login(user,password){

let newUrl=this.authUrl+user+"&password="+password;

return this.httpClient.post(newUrl,{});

}

      
}
