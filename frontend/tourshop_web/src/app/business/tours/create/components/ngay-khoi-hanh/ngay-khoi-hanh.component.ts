import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: "app-ngay-khoi-hanh",
  templateUrl: "./ngay-khoi-hanh.component.html",
  styleUrls: ["./ngay-khoi-hanh.component.scss"],
})
export class NgayKhoiHanhComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() name: string;

  constructor(private toast: NgToastService) {}
  get lstNKH() {
    return this.form?.controls?.[this.name]?.value || [];
  }

  set lstNKH(data) {
    this.form.patchValue({
      [this.name]: data,
    });
  }
  ngayKhs: any;
  ngayKh: Date = new Date();
  pipe = new DatePipe("en-US");
  giaNguoiLon: number;
  giaTreEn: number;
  giaTreNho: number;
  ngOnInit(): void {}

  onAdd() {
    const list = this.lstNKH;
    const today = new Date().toLocaleDateString();
    const thisDay = new Date(this.ngayKh).toLocaleDateString();
    if (today > thisDay) {
      this.toast.error({
        detail: "Cảnh báo",
        summary: "Ngày " + thisDay + " không hợp lệ",
        duration: 3000,
      });
    } else {
      list.push({
        ngayKh: this.pipe.transform(this.ngayKh, "dd/MM/yyyy"),
        giaNguoiLon: this.giaNguoiLon,
        giaTreEn: this.giaTreEn,
        giaTreNho: this.giaTreNho,
      });
      this.lstNKH = list;
      console.log(this.lstNKH);
    }
  }

  onRemove(ngayKh: Date) {
    this.lstNKH = this.lstNKH.filter((item: any) => item.ngayKh != ngayKh);
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  formatCurrency(money: number) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
}
