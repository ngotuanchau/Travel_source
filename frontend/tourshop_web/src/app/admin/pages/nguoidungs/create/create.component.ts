import { DatePipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgToastService } from "ng-angular-popup";

import { NguoiDungsService } from "../../../../service/nguoidungs.service";
import { FormField } from "../nguoidung";
@Component({
  selector: "app-nguoidungs-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.scss"],
})
export class NguoiDungsCreateComponent implements OnInit {
  Date = new Date(Date.now());
  form: FormGroup;
  lstAnh = [];
  isChecked = false;
  isAdmin = false;
  pipe = new DatePipe("en-US");
  checkToggel() {
    this.isChecked = !this.isChecked;
  }
  checkToggelAdmin() {
    this.isAdmin = !this.isAdmin;
  }
  readonly FormField = FormField;
  constructor(
    private userService: NguoiDungsService,
    private http: HttpClient,
    private toast: NgToastService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      [FormField.tenNguoiDung]: [null, Validators.required], //1
      [FormField.hoTen]: ["", Validators.required], //2
      [FormField.cmnd]: [null, Validators.required], //3
      [FormField.email]: [null, [Validators.required, Validators.email]], //4
      [FormField.sdt]: [null, [Validators.required, Validators.minLength(10)]], //5
      [FormField.ngaySinh]: [null, [Validators.required]], //6
      [FormField.isAdmin]: [false], //7
      [FormField.matKhau]: [
        null,
        [Validators.required, Validators.minLength(6)],
      ], //8
      [FormField.trangThai]: [1], //9
      [FormField.avt]: ["default.png"],
    });
  }
  isControlError(field: FormField, ...types: string[]) {
    const control = this.form.controls[field];
    if (control.invalid && (control.touched || control.dirty)) {
      return types.some((type) => !!control?.errors?.[type]);
    }
    return false;
  }
  onSubmit() {
    if (this.isChecked == false) {
      this.form.patchValue({
        [FormField.trangThai]: 0,
      });
    } else {
      this.form.patchValue({
        [FormField.trangThai]: 1,
      });
    }
    if (this.isAdmin == false) {
      this.form.patchValue({
        [FormField.isAdmin]: false,
      });
    } else {
      this.form.patchValue({
        [FormField.isAdmin]: true,
      });
    }
    if (this.form.value.ngaySinh != null) {
      this.form.patchValue({
        [FormField.ngaySinh]: this.pipe.transform(
          this.form.value.ngaySinh,
          "dd/MM/yyyy"
        ),
      });
    }
    this.userService.createUser(this.form.value).subscribe(
      (res) => {},
      (err) => {
        this.toast.error({
          detail: "Cảnh báo",
          summary: "Email đã được đăng ký",
          duration: 3000,
        });
      }
    );
  }
  ngOnInit(): void {}
}
