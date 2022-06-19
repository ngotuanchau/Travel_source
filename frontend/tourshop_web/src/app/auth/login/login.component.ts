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
    MatKhau: new FormControl("", [Validators.required]),
  });
  ngOnInit(): void {}
  submitForm() {
    if (this.loginForm.valid) {
      this.service.proceedLogin(this.loginForm.value).subscribe((result) => {
        if (result != null) {
          this.resposedata = result;
          localStorage.setItem("token", this.resposedata.token);
          localStorage.setItem("id", this.resposedata.id);
          localStorage.setItem("email", this.resposedata.email);
          localStorage.setItem("avt", this.resposedata.avt);
          this.router.navigate(["/ql-tours"]);
        }
      });
    }
  }
  isControlError(field: FormControl, ...types: string[]) {
    const control = this.loginForm.controls[field.value];
    if (control.invalid && (control.touched || control.dirty)) {
      return types.some((type) => !!control?.errors?.[type]);
    }
    return false;
  }
}
