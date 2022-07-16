import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DoanhNghiepsService {
  baseUrl = "http://localhost:40998/api/Doanhnghiep";
  constructor(private http: HttpClient) {}

  //get all user
  getAllBusiness(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/doanhnghiep_get");
  }

  update_doanhNghiep(doanhNghiep: any, id: any): Observable<any> {
    return this.http.put<any>(
      this.baseUrl + "/doanhnghiep_update/" + id,
      doanhNghiep
    );
  }
  change_pass(pass: any, id: any) {
    return this.http.put<any>(
      this.baseUrl + "/doanhnghiep/change_password/" + id,
      pass
    );
  }
}
