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
export class RoleGuard implements CanActivate {
  constructor(
    private service: AuthService,
    private route: Router,
    private toast: NgToastService
  ) {}
  canActivate() {
    if (this.service.IsLoggedIn()) {
      if (this.service.HaveAccess()) {
        return true;
      } else {
        this.toast.error({
          detail: "Cảnh báo",
          summary: "Bạn không có quyền truy cập",
          duration: 3000,
        });
        this.route.navigate(["home"]);
        return false;
      }
    } else {
      this.toast.error({
        detail: "Cảnh báo",
        summary: "Bạn không có quyền truy cập",
        duration: 3000,
      });
      this.route.navigate(["login"]);
    }
    return false;
  }
}
