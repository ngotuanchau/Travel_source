import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NguoiDung } from '../models/nguoidung.model';

@Injectable({
  providedIn:'root'
})
export class SignUpsService{
  baseUrl='https://localhost:44361/api';
  constructor(private http:HttpClient){}

  //Sign up for users
  signUpUser(Signup_user:NguoiDung):Observable<NguoiDung>{
    return this.http.post<NguoiDung>(this.baseUrl + '/Signup_user' ,Signup_user);
  }
}
