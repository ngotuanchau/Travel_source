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
export class AuthGuard implements CanActivate {
  constructor(private service: AuthService, private route: Router) {}
  canActivate() {
    if (this.service.IsLoggedIn()) {
      return true;
    } else {
      this.route.navigate(["login"]);
      return false;
      //Neu chua dang nhap thi chuyen huong den trang login
    }
  }
}
