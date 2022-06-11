import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CongTy } from '../../../models/congty.model';
import { SignUpsService } from '../../../service/signups.service';

@Component({
  selector: 'app-signup-business',
  templateUrl: './signup-business.component.html',
  styleUrls: ['./signup-business.component.scss']
})
export class SignupBusinessComponent implements OnInit {
  //select
khuVucList=['Miền Bắc', 'Miền Trung','Miền Nam'];

  Date = new Date(Date.now());
  constructor(private signupService: SignUpsService,private routes:Router,
     private signUpForm_bus: FormBuilder) { }

  ngOnInit(): void {
  }
//Business
congTy: CongTy = {
  id: 0,
  tenCongTy: '',
  email: '',
  matKhau: '',
  sdt: '',
  khuVuc: '',
  vanPhong: '',
  mst: '',
  theNganHang:'',
  ngayTao: this.Date,
  ngaySua:this.Date,
  trangThai: 1,
}

infoBusiness=this.signUpForm_bus.group({
  tenCongTy:['',[Validators.required]],
  email:['',[Validators.required,Validators.email]],
  matKhau:['',Validators.required],
  khuVuc:[''],
  vanPhong:['',Validators.required],
  sdt:['',Validators.required],
})
get b(){
  return this.infoBusiness.controls
}

onSubmit_bus(){
  this.signupService.signUpBusiness(this.congTy)
  .subscribe(
    response => {
      this.congTy = {
        id: 0,
        tenCongTy: '',
        email: '',
        matKhau: '',
        sdt: '',
        khuVuc: '',
        vanPhong: '',
        mst: '',
        theNganHang:'',
        ngayTao: this.Date,
        ngaySua:this.Date,
        trangThai: 1,
      }
    }
  );
  this.routes.navigate(['/login']);
}
}
