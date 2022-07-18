import { Component, AfterViewInit, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DoanhNghiepsService } from "../../service/doanhnghieps.service";
//declare var require: any;

@Component({
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  thongke: any;
  idDN: any;
  ngay: string;
  form: FormGroup;

  constructor(private doanhNghiepService: DoanhNghiepsService) {
    const today = new Date();
    this.form = new FormGroup({
      thang: new FormControl(""),
    });
  }
  ngOnInit(): void {
    this.idDN = localStorage.getItem("id");
  }
  thongKe() {
    console.log(this.form.value);
    this.doanhNghiepService
      .thongKe(this.idDN, this.form.value)
      .subscribe((res) => {
        this.thongke = res;
        console.log(this.form.value);
      });
  }
  //Ghép tháng năm
  ghep(thang: any) {
    const today = new Date();
    if (thang < 10) return "0" + thang + "/" + today.getFullYear();
    else return thang + "/" + today.getFullYear();
  }

  lstThang() {
    let list: any;
    list = [];
    for (var i = 1; i <= 12; i++) {
      list.push(i);
    }
    return list;
  }
}
