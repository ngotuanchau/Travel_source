import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { AuthService } from "../service/auth.service";
import { Observable } from "rxjs";
import { NgToastService } from "ng-angular-popup";

@Injectable({
  providedIn: "root",
})
export class RoleadminGuard implements CanActivate {
  constructor(
    private service: AuthService,
    private route: Router,
    private toast: NgToastService
  ) {}
  canActivate() {
    if (this.service.IsLoggedIn()) {
      if (this.service.HaveAccessAdmin()) {
        return true;
      }
      this.route.navigate(["home"]);
      return false;
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
