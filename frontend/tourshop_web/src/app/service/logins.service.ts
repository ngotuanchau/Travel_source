import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NguoiDung } from '../models/nguoidung.model';

@Injectable({
  providedIn:'root'
})
export class LoginsService{
  baseUrl='http://localhost:40998/api';
  constructor(private http:HttpClient){}

  //Login for users
  logInUser(nguoiDung:NguoiDung):Observable<NguoiDung>{
    return this.http.post<NguoiDung>(this.baseUrl + '/Login_user' ,nguoiDung);
  }
  //Login for admins
  logInAdmin(Login_admin:NguoiDung):Observable<NguoiDung>{
    return this.http.post<NguoiDung>(this.baseUrl + '/Login_admin' ,Login_admin);
  }
}
