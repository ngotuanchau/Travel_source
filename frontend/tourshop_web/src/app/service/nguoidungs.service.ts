import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NguoiDung } from '../models/nguoidung.model';

@Injectable({
  providedIn:'root'
})
export class NguoiDungsService{
  baseUrl='https://localhost:44361/api/Users';
  constructor(private http:HttpClient){}
}
