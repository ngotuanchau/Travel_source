import { DatePipe } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: "app-ngay-khoi-hanh-edit",
  templateUrl: "./ngay-khoi-hanh-edit.component.html",
  styleUrls: ["./ngay-khoi-hanh-edit.component.scss"],
})
export class NgayKhoiHanhEditComponent implements OnInit {
  @Input() lstNKH: any;
  @Input() form: FormGroup;
  @Input() nhungNgayKhoiHanh: any;
  constructor(private toast: NgToastService) {}
  ngayKhs: any;
  ngayKh: Date = new Date();
  pipe = new DatePipe("en-US");
  giaNguoiLon: number;
  giaTreEn: number;
  giaTreNho: number;
  newList: any;
  deleteList: any;
  ngOnInit(): void {
    this.newList = [];
    this.deleteList = [];
  }

  get listNKH1() {
    let list: any;
    list = [];
    for (let ng of this.lstNKH) {
      list.push({
        id: ng.id,
        ngayKh: this.pipe.transform(ng.ngayKh, "dd/MM/yyyy"),
        giaNguoiLon: ng.giaNguoiLon,
        giaTreEn: ng.giaTreEn,
        giaTreNho: ng.giaTreNho,
        mode: ng.mode,
      });
    }

    return list.concat(this.newList).concat(this.deleteList);
  }
  setlistNKH1ToForm() {
    this.form.patchValue({
      [this.nhungNgayKhoiHanh]: this.listNKH1,
    });
  }
  onAdd() {
    const list = this.newList;
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
              id: 0,
              ngayKh: this.pipe.transform(this.ngayKh, "dd/MM/yyyy"),
              giaNguoiLon: this.giaNguoiLon,
              giaTreEn: this.giaTreEn,
              giaTreNho: this.giaTreNho,
            });
            this.newList = list;
            // console.log(this.listNKH1);
            this.setlistNKH1ToForm();
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
  }
  onDelete(id: number) {
    const list = this.deleteList;
    for (let nkh of this.lstNKH) {
      if (nkh.id == id) {
        list.push({
          id: id,
          ngayKh: this.pipe.transform(nkh.ngayKh, "dd/MM/yyyy"),
          giaNguoiLon: nkh.giaNguoiLon,
          giaTreEn: nkh.giaTreEn,
          giaTreNho: nkh.giaTreNho,
          mode: 2,
        });
        break;
      }
    }
    this.lstNKH = this.lstNKH.filter((item: any) => item.id != id);
    this.deleteList = list;
    // console.log(this.listNKH1);
    this.setlistNKH1ToForm();
    this.sort();
  }
  onRemove(ngayKh: Date) {
    this.newList = this.newList.filter((item: any) => item.ngayKh != ngayKh);
    this.sort();
    this.setlistNKH1ToForm();
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
