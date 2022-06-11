import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CongTy } from '../models/congty.model';
import { NguoiDung } from '../models/nguoidung.model';

@Injectable({
  providedIn:'root'
})
export class SignUpsService{
  baseUrl='http://localhost:40998/api';
  constructor(private http:HttpClient){}

  //Sign up for users
  signUpUser(Signup_user:NguoiDung):Observable<NguoiDung>{
    return this.http.post<NguoiDung>(this.baseUrl + '/Signup_user' ,Signup_user);
  }

  signUpBusiness(CongTy:CongTy):Observable<CongTy>{
    return this.http.post<CongTy>(this.baseUrl + '/Signup_business' ,CongTy);
  }
}
