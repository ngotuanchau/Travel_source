import { HttpClient, HttpClientModule } from "@angular/common/http";
import { identifierModuleUrl } from "@angular/compiler";
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
  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }
  change_pass(id: any, pass: any): Observable<any> {
    return this.http.put<any>(
      this.baseUrl + "/user/change_password/" + id,
      pass
    );
  }
  getBillByUser(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/user/get_tour_dadat/" + id);
  }
  huyTour(id: any) {
    return this.http.delete<any>(this.baseUrl + "/user/huy_tourdat/" + id);
  }
  lock(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/user_lock/" + id);
  }
  unlock(id: any): Observable<any> {
    return this.http.get<any>(this.baseUrl + "/user_unlock/" + id);
  }
}
