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
  getDoanhNghiep(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/doanhnghiep_get/" + id);
  }

  update_doanhNghiep(id: any, doanhNghiep: any): Observable<any> {
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
  thongKe(id: any, thang: any): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + "/doanhnghiep/thongke/" + id,
      thang
    );
  }
  duyetDN(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/doanhnghiep_duyet/" + id);
  }
  khongDuyetDN(id: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + "/doanhnghiep_huyduyet/" + id, id);
  }
}
