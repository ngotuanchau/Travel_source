import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CongTy } from "../models/congty.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = "http://localhost:40998/api";
  constructor(private http: HttpClient) {}

  proceedLogin(usercred: any) {
    return this.http.post(this.baseUrl + "/Login_business", usercred);
  }
  IsLoggedIn() {
    return localStorage.getItem("token") != null;
  }
  GetToken() {
    return localStorage.getItem("token") || "";
  }
  HaveAccess() {
    var loggintoken = localStorage.getItem("token") || "";
    var _extractedtoken = loggintoken.split(".")[1];
    var _atobdata = atob(_extractedtoken);
    var _finaldata = JSON.parse(_atobdata);
    console.log(_finaldata);
  }
}
