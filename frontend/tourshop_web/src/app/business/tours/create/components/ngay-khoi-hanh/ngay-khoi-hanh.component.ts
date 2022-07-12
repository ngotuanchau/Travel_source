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
    const today = new Date();
    const thisDay = new Date(this.ngayKh);
    if (thisDay.getFullYear() >= today.getFullYear()) {
      if (thisDay.getMonth() >= today.getMonth()) {
        if (
          (thisDay.getDate() >= today.getDate() &&
            thisDay.getMonth() == today.getMonth()) ||
          thisDay.getMonth() > today.getMonth()
        ) {
          if (
            this.giaNguoiLon != null &&
            this.giaTreEn != null &&
            this.giaTreNho != null
          ) {
            list.push({
              ngayKh: this.pipe.transform(this.ngayKh, "dd/MM/yyyy"),
              giaNguoiLon: this.giaNguoiLon,
              giaTreEn: this.giaTreEn,
              giaTreNho: this.giaTreNho,
            });
            this.lstNKH = list;
            console.log(this.lstNKH);
          } else {
            this.toast.error({
              detail: "Cảnh báo",
              summary: "Chưa nhập đầy đủ thông tin",
              duration: 3000,
            });
          }
        } else {
          this.toast.error({
            detail: "Cảnh báo",
            summary:
              this.pipe.transform(this.ngayKh, "dd/MM/yyyy") + " không hợp lệ",
            duration: 3000,
          });
        }
      } else {
        this.toast.error({
          detail: "Cảnh báo",
          summary:
            this.pipe.transform(this.ngayKh, "dd/MM/yyyy") + " không hợp lệ",
          duration: 3000,
        });
      }
    } else {
      this.toast.error({
        detail: "Cảnh báo",
        summary:
          this.pipe.transform(this.ngayKh, "dd/MM/yyyy") + " không hợp lệ",
        duration: 3000,
      });
    }

    this.sort();
  }

  onRemove(ngayKh: Date) {
    this.lstNKH = this.lstNKH.filter((item: any) => item.ngayKh != ngayKh);
    this.sort();
  }
  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  minus(a: number, b: number) {
    return a + b;
  }
  formatCurrency(money: number) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "VND",
    }).format(money);
  }
  sort() {
    //Sắp xếp danh sách lịch trình
    var temp = 0;
    for (var i = 0; i < this.lstNKH.length; i++) {
      for (var j = i; j < this.lstNKH.length; j++) {
        if (this.lstNKH[j].ngayKh < this.lstNKH[i].ngayKh) {
          temp = this.lstNKH[j];
          this.lstNKH[j] = this.lstNKH[i];
          this.lstNKH[i] = temp;
        }
      }
    }
  }
}
