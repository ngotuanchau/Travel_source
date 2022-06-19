import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiadiemsService {
  baseUrl='http://localhost:40998/api/DiaDiem';
  constructor(private http:HttpClient) { }

  //Get all DiaDiem
  getAllDiaDiem():Observable<any>{
    return this.http.get<any>(this.baseUrl + '/get_diadiem');
  }
}
