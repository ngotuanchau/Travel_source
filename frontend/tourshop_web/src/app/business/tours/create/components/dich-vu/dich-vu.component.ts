import { Component, Input, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {
  AmThuc,
  lstAmThucs,
  lstLuuTrus,
  lstPhuongTiens,
  LuuTru,
  PhuongTien,
} from "./dichvu-data";
@Component({
  selector: "app-dich-vu",
  templateUrl: "./dich-vu.component.html",
  styleUrls: ["./dich-vu.component.scss"],
})
export class DichVuComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() nameAT: string;
  @Input() nameLT: string;
  @Input() namePT: string;

  lstAmThuc: AmThuc[];
  lstLuuTru: LuuTru[];
  lstPhuongTien: PhuongTien[];

  //Am thuc
  get listAT() {
    return this.form?.controls?.[this.nameAT]?.value || "";
  }

  set listAT(data) {
    this.form.patchValue({
      [this.nameAT]: data,
    });
  }
  //Luu tru
  get listLT() {
    return this.form?.controls?.[this.nameLT]?.value || [];
  }

  set listLT(data) {
    this.form.patchValue({
      [this.nameLT]: data,
    });
  }
  //Phuong tien
  get listPT() {
    return this.form?.controls?.[this.namePT]?.value || [];
  }

  set listPT(data) {
    this.form.patchValue({
      [this.namePT]: data,
    });
  }
  constructor(private _formBuilder: FormBuilder) {
    this.lstAmThuc = lstAmThucs;
    this.lstLuuTru = lstLuuTrus;
    this.lstPhuongTien = lstPhuongTiens;
  }
  onChangeAT($event: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;

    this.lstAmThuc = this.lstAmThuc.map((d) => {
      if (d.id == id) {
        d.completed = isChecked;
        return d;
      }
      return d;
    });
    const ids = this.lstAmThuc
      .filter((item) => item.completed)
      .map((item) => item.id);
    // this.listAT = ids;
    var str1 = ids.toString(); // Gives you "42,55"
    this.listAT = String(str1);
  }
  onChangeLT($event: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;

    this.lstLuuTru = this.lstLuuTru.map((d) => {
      if (d.id == id) {
        d.completed = isChecked;
        return d;
      }
      return d;
    });

    const ids = this.lstLuuTru
      .filter((item) => item.completed)
      .map((item) => item.id);
    var str1 = ids.toString(); // Gives you "42,55"
    this.listLT = String(str1);
  }
  onChangePT($event: any) {
    const id = $event.target.value;
    const isChecked = $event.target.checked;

    this.lstPhuongTien = this.lstPhuongTien.map((d) => {
      if (d.id == id) {
        d.completed = isChecked;
        return d;
      }
      return d;
    });
    const ids = this.lstPhuongTien
      .filter((item) => item.completed)
      .map((item) => item.id);
    var str1 = ids.toString(); // Gives you "42,55"
    this.listPT = String(str1);
  }
  ngOnInit(): void {}
}
