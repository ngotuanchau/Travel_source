import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TheloaisService {
  baseUrl = "http://localhost:40998/api/TheLoai";
  constructor(private http: HttpClient) {}

  //Get all The loai
  getTheLoai(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/get_theloai");
  }
  //Create
  create(theloai: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/admin/create_theloai", theloai);
  }
  //Update
  update(id: any, theloai: any): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + "/admin/update_theloai/" + id,
      theloai
    );
  }
  //delete
  delete(id: any) {
    return this.http.delete<any>(this.baseUrl + "/admin/delete_theloai/" + id);
  }
  //khôi phục
  khoiPhuc(id: any) {
    return this.http.delete<any>(
      this.baseUrl + "/admin/khoiphuc_theloai/" + id
    );
  }
}
