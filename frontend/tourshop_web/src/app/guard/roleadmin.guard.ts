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

@Injectable({
  providedIn: "root",
})
export class RoleadminGuard implements CanActivate {
  constructor(private service: AuthService, private route: Router) {}
  canActivate() {
    if (this.service.IsLoggedIn()) {
      if (this.service.HaveAccessAdmin()) {
        return true;
      }
      this.route.navigate(["home"]);
      return false;
    } else this.route.navigate(["login_admin"]);
    return false;
  }
}
