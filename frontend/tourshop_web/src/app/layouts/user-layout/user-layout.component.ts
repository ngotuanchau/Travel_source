import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../service/auth.service";

@Component({
  selector: "app-user-layout",
  templateUrl: "./user-layout.component.html",
  styleUrls: ["./user-layout.component.scss"],
})
export class UserLayoutComponent implements OnInit {
  loginStatus() {
    if (this.service.IsLoggedIn()) return true;
    else return false;
  }
  idLogin = localStorage.getItem("id");
  role: string;
  name = localStorage.getItem("hoTen");
  email = localStorage.getItem("email");
  avt = localStorage.getItem("avt");
  constructor(private service: AuthService) {}

  ngOnInit(): void {}
}
