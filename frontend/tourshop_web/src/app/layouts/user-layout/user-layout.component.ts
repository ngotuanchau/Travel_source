import { Component, OnInit } from "@angular/core";
import { NguoiDungsService } from "../../service/nguoidungs.service";
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
  idLogin: any;
  role: string;
  user: any;
  // name = localStorage.getItem("hoTen");
  // email = localStorage.getItem("email");
  // avt = localStorage.getItem("avt");

  constructor(
    private service: AuthService,
    private nguoiDungService: NguoiDungsService
  ) {}

  ngOnInit(): void {
    this.idLogin = localStorage.getItem("id");
    this.nguoiDungService.getUser(this.idLogin).subscribe((res) => {
      this.user = res;
    });
  }
}
