import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NguoiDung } from '../../models/nguoidung.model';
import { LoginsService } from '../../service/logins.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {

  }

  constructor(private loginService: LoginsService){}

  loginForm = new FormGroup({
    Email: new FormControl("",[Validators.required,Validators.email]),
    Password: new FormControl("",[Validators.required,Validators.minLength(6)]),
  });
get Email(): FormControl{
  return this.loginForm.get('Email') as FormControl;
}
get Password(): FormControl{
  return this.loginForm.get('Password') as FormControl;
}
Date = new Date(Date.now());
nguoiDung: NguoiDung = {
  tenNguoiDung: '',
  email:this.loginForm.value.Email,
  matKhau: this.loginForm.value.Password,
  cmnd: '',
  sdt: '',
  avt: '',
  hoTen: '',
  ngayTao: this.Date,
  ngaySua: this.Date,
  trangThai: 1,
  isAdmin: false,
  id: 0,
}
isUserValid: boolean =false;
loginSubmit(){
this.loginService.logInUser(this.nguoiDung ).subscribe(
  res=>{
    this.isUserValid=true;
    alert(this.isUserValid+"Thành công")
  }
);
}
}
