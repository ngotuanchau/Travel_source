import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NguoiDungsService {
  baseUrl = "http://localhost:40998/api/User";
  constructor(private http: HttpClient) {}

  //get user
  getUser(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/" + id);
  }
  //get all user
  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/user_get");
  }
  updateUser(id: any, data: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + "/" + id, data);
  }
}
