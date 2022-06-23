import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../service/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  title = "Đăng nhập";
  isChecked = false;

  checkToggel() {
    this.isChecked = !this.isChecked;
    console.log(this.isChecked);
  }
  messageclass = "";
  measage = "";
  businessid: any;
  editdata: any;
  resposedata: any;
  isSuccess = false;
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
    if (this.isChecked) {
      if (this.loginForm.valid) {
        this.service
          .proceedLoginBusiness(this.loginForm.value)
          .subscribe((result) => {
            if (result != null) {
              this.resposedata = result;
              localStorage.setItem("token", this.resposedata.token);
              localStorage.setItem("id", this.resposedata.id);
              localStorage.setItem("email", this.resposedata.email);
              localStorage.setItem("hoTen", this.resposedata.hoTen);
              localStorage.setItem("avt", this.resposedata.avt);
              this.router.navigate(["/ql-tours"]);
            }
          });
      }
    } else {
      if (this.loginForm.valid) {
        this.service
          .proceedLoginUser(this.loginForm.value)
          .subscribe((result) => {
            if (result != null) {
              this.resposedata = result;
              localStorage.setItem("token", this.resposedata.token);
              localStorage.setItem("id", this.resposedata.id);
              localStorage.setItem("email", this.resposedata.email);
              localStorage.setItem("hoTen", this.resposedata.hoTen);
              localStorage.setItem("avt", this.resposedata.avt);
              this.router.navigate(["/home"]);
            }
          });
      }
    }
  }
  closeAlert() {
    this.isSuccess = false;
  }
}
