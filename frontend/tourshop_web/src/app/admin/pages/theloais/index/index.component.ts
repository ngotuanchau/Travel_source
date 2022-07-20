import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgToastService } from "ng-angular-popup";
import { TheloaisService } from "../../../../service/theloais.service";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class TheLoaiIndexComponent implements OnInit {
  form: FormGroup;
  form_update: FormGroup;
  theloais: any;
  hidden: boolean = false;
  text: string;
  constructor(
    private theloaiService: TheloaisService,
    private toast: NgToastService
  ) {
    this.form = new FormGroup({
      tentheloai: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllTheLoai();
    this.text = "Thêm";
  }
  getAllTheLoai() {
    this.theloais = [];
    this.theloaiService.getTheLoai().subscribe((res) => {
      this.theloais = res.listTheLoai;
    });
  }
  //Lọc địa điểm theo trạng thái
  theLoaiByStatus(stt: any) {
    let list: any;
    list = [];
    for (let dd of this.theloais) {
      if (dd.trangThai == stt) {
        list.push(dd);
      }
    }
    return list;
  }
  //Thêm địa điểm
  add() {
    let trung: boolean = false;
    for (let dd of this.theloais) {
      if (dd.tentheloai == this.form.value.tentheloai) {
        trung = false;
        break;
      } else {
        trung = true;
      }
    }
    if (trung) {
      this.theloaiService.create(this.form.value).subscribe((res) => {
        this.toast.success({
          detail: "Thông báo",
          summary:
            "Đã thêm thể loại " + this.form.value.tentheloai + " thành công",
          duration: 3000,
        });
        this.getAllTheLoai();
        this.form.reset();
      });
    } else {
      this.toast.error({
        detail: "Thông báo",
        summary: "Thể loại " + this.form.value.tentheloai + " đã tồn tại",
        duration: 3000,
      });
    }
  }
  //Cập nhật
  update(id: any) {
    let trung: boolean = false;
    for (let dd of this.theloais) {
      if (dd.ten == this.form_update.value.tentheloai) {
        trung = false;
        break;
      } else {
        trung = true;
      }
    }
    if (trung) {
      this.theloaiService
        .update(id, this.form_update.value)
        .subscribe((res) => {
          this.toast.success({
            detail: "Thông báo",
            summary:
              "Cập nhật thể loại " +
              this.form_update.value.tentheloai +
              " thành công",
            duration: 3000,
          });
          this.getAllTheLoai();
          this.form_update.reset();
        });
    } else {
      this.toast.error({
        detail: "Thông báo",
        summary:
          "Thể loại " + this.form_update.value.tentheloai + " đã tồn tại",
        duration: 3000,
      });
    }
  }
  //Tìm tên thể loại theo Id
  findTLById(id: any) {
    return this.theloais.find((item: any) => item.id == id)?.tenLoai;
  }
  id: any;
  capNhat(theloai: any) {
    this.id = theloai.id;
    this.form_update = new FormGroup({
      tentheloai: new FormControl(this.findTLById(this.id), [
        Validators.required,
      ]),
    });
    this.hidden = true;
  }
  xoa(id: any) {
    this.theloaiService.delete(id).subscribe((res) => {
      this.getAllTheLoai();
    });
  }
  khoiphuc(id: any) {
    this.theloaiService.khoiPhuc(id).subscribe((res) => {
      this.getAllTheLoai();
    });
  }
}
