import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DiadiemsService {
  baseUrl = "http://localhost:40998/api/DiaDiem";
  constructor(private http: HttpClient) {}

  //Get DiaDiem
  getDiaDiem(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/get_diadiem");
  }
  //Get all DiaDiem
  getAllDiaDiem(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/get_all_diadiem");
  }
  //Doanh nghiệp đề xuất DiaDiem
  deXuatDiaDiem(diadiem: any): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + "/doanhnghiep/dexuat_diadiem",
      diadiem
    );
  }

  //Duyệt địa điểm
  duyetDiaDiem(id: any): Observable<any> {
    return this.http.put<any>(
      this.baseUrl + "/admin/xacnhan_diadiem/" + id,
      id
    );
  }
  //Hủy đề xuất
  huyDiaDiem(id: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + "/admin/huy_diadiem/" + id, id);
  }
  //Xóa đề xuất
  xoaDiaDiem(id: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + "/admin/delete_diadiem/" + id, id);
  }
  //Cập nhật địa điểm
  capNhatDiaDiem(id: any, diadiem: any): Observable<any> {
    return this.http.put<any>(
      this.baseUrl + "/admin/update_diadiem/" + id,
      diadiem
    );
  }
  //Tạo địa điểm
  taoDiaDiem(diadiem: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + "/admin/create_diadiem", diadiem);
  }
  //Khôi phục địa điểm
  khoiPhuc(id: any): Observable<any> {
    return this.http.put<any>(
      this.baseUrl + "/admin/khoiphuc_diadiem/" + id,
      id
    );
  }
}
