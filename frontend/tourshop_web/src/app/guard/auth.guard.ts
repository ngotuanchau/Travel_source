import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { AuthService } from "../service/auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private service: AuthService,
    private route: Router,
    private toast: NgToastService
  ) {}
  canActivate() {
    if (this.service.IsLoggedIn()) {
      return true;
    } else {
      this.toast.error({
        detail: "Cảnh báo",
        summary: "Bạn chưa đăng nhập",
        duration: 3000,
      });
      this.route.navigate(["login"]);

      //Neu chua dang nhap thi chuyen huong den trang login
    }
    return false;
  }
}
