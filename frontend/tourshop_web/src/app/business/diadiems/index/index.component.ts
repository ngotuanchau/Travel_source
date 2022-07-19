import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { NgToastService } from "ng-angular-popup";
import { DiadiemsService } from "../../../service/diadiems.service";

@Component({
  selector: "app-diadiems",
  templateUrl: "index.component.html",
  styleUrls: ["index.component.scss"],
})
export class DiaDiemsIndexComponent implements OnInit {
  form: FormGroup;
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
  }
  diadiems: any;
  //Lay tat ca dia diem
  getAllDiaDiem() {
    this.diadiemService.getDiaDiem().subscribe((response) => {
      this.diadiems = response.listDiaDiem;
    });
  }

  dexuatDD() {
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
      this.diadiemService.deXuatDiaDiem(this.form.value).subscribe((res) => {
        this.toast.success({
          detail: "Thông báo",
          summary: "Đã đề xuất địa điểm " + this.form.value.tendiadiem,
          duration: 3000,
        });
      });
    } else {
      this.toast.error({
        detail: "Thông báo",
        summary: "Địa điểm " + this.form.value.tendiadiem + " đã tồn tại",
        duration: 3000,
      });
    }
  }
}
