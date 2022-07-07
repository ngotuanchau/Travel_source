import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NguoiDungsService {
  baseUrl = "https://localhost:40998/api/Users";
  constructor(private http: HttpClient) {}

  //get user
  getUser(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/" + id);
  }
}
