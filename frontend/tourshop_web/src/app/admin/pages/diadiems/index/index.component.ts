import { Component, forwardRef, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { NgToastService } from "ng-angular-popup";
import { DiadiemsService } from "../../../../service/diadiems.service";

@Component({
  selector: "app-diadiems",
  templateUrl: "index.component.html",
  styleUrls: ["index.component.scss"],
})
export class DiaDiemsIndexComponent implements OnInit {
  form: FormGroup;
  form_update: FormGroup;
  hidden: boolean = false;
  text: string;
  key: string;
  constructor(
    private diadiemService: DiadiemsService,
    private toast: NgToastService
  ) {
    this.form = new FormGroup({
      tendiadiem: new FormControl("", [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.getAllDiaDiem();
    this.text = "Thêm";
  }
  diadiems: any;
  //Lay tat ca dia diem
  getAllDiaDiem() {
    this.diadiemService.getAllDiaDiem().subscribe((response) => {
      this.diadiems = response;
    });
  }
  //Lay dia diem trang thai 0 va 1
  getDiaDiemDaDuyet() {
    let list: any;
    list = [];
    for (let dd of this.diadiems) {
      if (dd.trangThai == 1 || dd.trangThai == 0) {
        list.push(dd);
      }
    }
    return list;
  }
  //Hủy đề xuất
  huyDeXuat(id: any) {
    this.diadiemService.huyDiaDiem(id).subscribe((res) => {
      this.getAllDiaDiem();
    });
  }
  //Xóa địa điểm
  xoaDiaDiem(id: any) {
    this.diadiemService.xoaDiaDiem(id).subscribe((res) => {
      this.getAllDiaDiem();
    });
  }
  //Duyệt địa điểm
  duyetDiaDiem(id: any) {
    this.diadiemService.duyetDiaDiem(id).subscribe((res) => {
      this.getAllDiaDiem();
    });
  }
  //Lọc địa điểm theo trạng thái
  diaDiemByStatus(stt: any) {
    let list: any;
    list = [];
    for (let dd of this.diadiems) {
      if (dd.trangThai == stt) {
        list.push(dd);
      }
    }
    return list;
  }
  //Thêm địa điểm
  addDiaDiem() {
    let trung: boolean = false;
    for (let dd of this.diadiems) {
      if (dd.tendiadiem == this.form.value.tendiadiem) {
        trung = false;
        break;
      } else {
        trung = true;
      }
    }
    if (trung) {
      this.diadiemService.taoDiaDiem(this.form.value).subscribe((res) => {
        this.toast.success({
          detail: "Thông báo",
          summary:
            "Đã thêm địa điểm " + this.form.value.tendiadiem + " thành công",
          duration: 3000,
        });
        this.getAllDiaDiem();
        this.form.reset();
      });
    } else {
      this.toast.error({
        detail: "Thông báo",
        summary: "Địa điểm " + this.form.value.tendiadiem + " đã tồn tại",
        duration: 3000,
      });
    }
  }
  //Cập nhật
  updateDiaDiem(id: any) {
    let trung: boolean = false;
    for (let dd of this.diadiems) {
      if (dd.ten == this.form_update.value.tendiadiem) {
        trung = false;
        break;
      } else {
        trung = true;
      }
    }
    if (trung) {
      this.diadiemService
        .capNhatDiaDiem(id, this.form_update.value)
        .subscribe((res) => {
          this.toast.success({
            detail: "Thông báo",
            summary:
              "Cập nhật địa điểm " +
              this.form_update.value.tendiadiem +
              " thành công",
            duration: 3000,
          });
          this.getAllDiaDiem();
          this.form_update.reset();
        });
    } else {
      this.toast.error({
        detail: "Thông báo",
        summary:
          "Tên địa điểm " + this.form_update.value.tendiadiem + " đã tồn tại",
        duration: 3000,
      });
    }
  }
  //Tìm tên địa điểm theo Id
  findDDById(id: any) {
    return this.diadiems.find((item: any) => item.id == id)?.ten;
  }
  id: any;
  capNhat(diadiem: any) {
    this.id = diadiem.id;
    this.form_update = new FormGroup({
      tendiadiem: new FormControl(this.findDDById(this.id), [
        Validators.required,
      ]),
    });
    this.hidden = true;
  }
  khoiphuc(id: any) {
    this.diadiemService.khoiPhuc(id).subscribe((res) => {
      this.getAllDiaDiem();
    });
  }
}
