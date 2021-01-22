import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

//url="http://192.168.1.135:9001/repayment/api/user/login?user=carlos.moncada&password=5839ecdfd43bc7467f77cba4a40ea64c8ee5f986f61cf16a0e024ed2225891a4";
url="http://192.168.1.135:9001/repayment/api/user/login?user=";
  constructor( private httpClient: HttpClient) {

   }

login(user,password){

let newUrl=this.url+user+"&password="+password;

  return this.httpClient.post(newUrl,{});

}


}
