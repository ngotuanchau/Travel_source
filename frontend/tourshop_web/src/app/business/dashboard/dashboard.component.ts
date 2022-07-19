import { Component, AfterViewInit, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DoanhNghiepsService } from "../../service/doanhnghieps.service";
import { DatePipe } from "@angular/common";
//declare var require: any;

@Component({
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  thongke: any;
  idDN: any;
  ngay: string;
  form: FormGroup;
  pipe = new DatePipe("en-US");
  constructor(private doanhNghiepService: DoanhNghiepsService) {
    const today = new Date();
    this.form = new FormGroup({
      thang: new FormControl(""),
    });
  }
  today = new Date();
  ngOnInit(): void {
    this.idDN = localStorage.getItem("id");

    if (this.today.getMonth() + 1 < 10) {
      this.form.value.thang =
        "0" + (this.today.getMonth() + 1) + "/" + this.today.getFullYear();
    } else {
      this.form.value.thang =
        this.today.getMonth() + 1 + "/" + this.today.getFullYear();
    }
    this.thongKe();
  }
  thongKe() {
    this.doanhNghiepService
      .thongKe(this.idDN, this.form.value)
      .subscribe((res) => {
        this.thongke = res;
      });
  }
  choose() {
    this.form.value.thang = this.pipe.transform(
      this.form.value.thang,
      "MM/yyyy"
    );
    this.thongKe();
  }
  formatCurrency(money: number) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
}
