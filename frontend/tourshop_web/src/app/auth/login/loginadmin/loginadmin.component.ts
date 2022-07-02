import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../service/auth.service";
@Component({
  selector: "app-loginadmin",
  templateUrl: "./loginadmin.component.html",
  styleUrls: ["./loginadmin.component.scss"],
})
export class LoginadminComponent implements OnInit {
  title = "Đăng nhập";
  messageclass = "";
  measage = "";
  businessid: any;
  editdata: any;
  resposedata: any;

  constructor(private router: Router, private service: AuthService) {
    localStorage.clear();
  }
  loginForm = new FormGroup({
    Email: new FormControl("", [Validators.required, Validators.email]),
    MatKhau: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  ngOnInit(): void {}
  ProceedLogin() {
    if (this.loginForm.valid) {
      this.service
        .proceedLoginAdmin(this.loginForm.value)
        .subscribe((result) => {
          if (result != null) {
            this.resposedata = result;
            localStorage.setItem("token", this.resposedata.token);
            localStorage.setItem("id", this.resposedata.id);
            localStorage.setItem("email", this.resposedata.email);
            localStorage.setItem("hoTen", this.resposedata.hoTen);
            localStorage.setItem("avt", this.resposedata.avt);
            this.router.navigate(["/dashboard"]);
          }
        });
    }
  }
}
