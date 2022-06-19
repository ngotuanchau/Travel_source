import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheloaisService {
  baseUrl='http://localhost:40998/api/TheLoai';
  constructor(private http:HttpClient) { }

  //Get all The loai
  getTheLoai():Observable<any>{
    return this.http.get<any>(this.baseUrl+'/get_theloai');
  }
}
