import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EMPTY } from 'rxjs';
import { NguoiDung } from '../../models/nguoidung.model';
import { SignUpsService } from '../../service/signups.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  alert:boolean=false;
  danger:boolean=false;
  title='Đăng ký';
  Date = new Date(Date.now());
  nguoiDung: NguoiDung = {
    tenNguoiDung: '',
    email: '',
    matKhau: '',
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
  constructor(private signupService: SignUpsService,private routes:Router,
    private signUpForm: FormBuilder) { }

    infoUser=this.signUpForm.group({
      tenNguoiDung:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      matKhau:['',Validators.required],
      cmnd:['',Validators.required],
      sdt:['',Validators.required],
      hoTen:['',Validators.required],
    })
    get f(){
      return this.infoUser.controls
    }
  ngOnInit(): void{
  }

  onSubmit(){
    this.signupService.signUpUser(this.nguoiDung)
    .subscribe(
      response => {
        this.nguoiDung = {
          tenNguoiDung: '',
          email: '',
          matKhau: '',
          cmnd: '',
          sdt: '',
          avt: 'test.jpg',
          hoTen: '',
          ngayTao: this.Date,
          ngaySua: this.Date,
          trangThai: 0,
          isAdmin: false,
          id: 0,
        }
      }
    );
    this.routes.navigate(['/login']);
  }
  closeAlert(){
    this.alert=false;
  }
}
