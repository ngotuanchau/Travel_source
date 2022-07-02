import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AnhsService {
  baseUrl = "http://localhost:40998/api/Anh";
  baseURLNodeJS = "http://localhost:3000";
  constructor(private http: HttpClient) {}

  //Thêm ảnh tour
  //Update_anh
  createImage(data: any): Observable<any> {
    var body = {
      anhs: data,
    };
    return this.http.post<any[]>(this.baseUrl + "/create", body);
  }
}
