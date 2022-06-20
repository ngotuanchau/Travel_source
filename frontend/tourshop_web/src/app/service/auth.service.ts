import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  apiUrl = "http://localhost:40998/api";

  constructor(private http: HttpClient) {}
  //login_business
  proceedLoginBusiness(usercred: any) {
    return this.http.post(this.apiUrl + "/Login_business", usercred);
  }
  //login_User
  proceedLoginUser(usercred: any) {
    return this.http.post(this.apiUrl + "/Login_user", usercred);
  }
  //login_Admin
  proceedLoginAdmin(usercred: any) {
    return this.http.post(this.apiUrl + "/Login_admin", usercred);
  }
  //Kiem tra dang nhap
  IsLoggedIn() {
    return localStorage.getItem("token") != null;
  }
  GetToken() {
    return localStorage.getItem("token") || "";
  }
  //Check role business
  HaveAccess() {
    var loggintoken = localStorage.getItem("token") || "";
    //cat chuoi token
    var _extractedtoken = loggintoken.split(".")[1];
    //trich xuat
    var _atobdata = atob(_extractedtoken);
    //chuyen du lieu json
    var _finaldata = JSON.parse(_atobdata);
    console.log(_finaldata);
    if (_finaldata.role == "Business") {
      return true;
    }
    alert("Ban khong co quyen truy cap");
    return false;
  }
  //Check role admin
  HaveAccessAdmin() {
    var loggintoken = localStorage.getItem("token") || "";
    //cat chuoi token
    var _extractedtoken = loggintoken.split(".")[1];
    //trich xuat
    var _atobdata = atob(_extractedtoken);
    //chuyen du lieu json
    var _finaldata = JSON.parse(_atobdata);
    console.log(_finaldata);
    if (_finaldata.role == "Admin") {
      return true;
    }
    return false;
  }
}
