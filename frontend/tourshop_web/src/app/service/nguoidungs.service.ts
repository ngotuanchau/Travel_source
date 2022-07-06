import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NguoiDungsService {
  baseUrl = "https://localhost:40998/api/Users";
  constructor(private http: HttpClient) {}

  //Get detail
  getDetailTour(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/get_a_user/" + id);
  }
}
