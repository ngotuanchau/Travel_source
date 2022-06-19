import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { PhanvungsService } from "../../../../../service/phanvungs.service";
import { TheloaisService } from "../../../../../service/theloais.service";
import { DiadiemsService } from "../../../../../service/diadiems.service";

@Component({
  selector: "app-thong-tin",
  templateUrl: "./thong-tin.component.html",
  styleUrls: ["./thong-tin.component.scss"],
})
export class ThongTinComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() diemdi: string;
  @Input() diemden: string;
  @Input() theloai: string;
  @Input() phanvung: string;
  constructor(
    private diadiemService: DiadiemsService,
    private phanvungService: PhanvungsService,
    private theloaiService: TheloaisService
  ) {}
  get diemDi() {
    return this.form?.controls?.[this.diemdi]?.value || 0;
  }

  set diemDi(data) {
    this.form.patchValue({
      [this.diemdi]: parseInt(data),
    });
  }
  get diemDen() {
    return this.form?.controls?.[this.diemden]?.value || 0;
  }

  set diemDen(data) {
    this.form.patchValue({
      [this.diemden]: parseInt(data),
    });
  }
  get theLoai() {
    return this.form?.controls?.[this.theloai]?.value || 0;
  }

  set theLoai(data) {
    this.form.patchValue({
      [this.theloai]: parseInt(data),
    });
  }
  get phanVung() {
    return this.form?.controls?.[this.phanvung]?.value || 0;
  }

  set phanVung(data) {
    this.form.patchValue({
      [this.phanvung]: parseInt(data),
    });
  }
  ngOnInit(): void {
    this.getAllDiaDiem();
    this.getPhanVung();
    this.getTheLoai();
  }
  diadiems: any;
  phanvungs: any;
  theloais: any;
  //Lay tat ca dia diem
  getAllDiaDiem() {
    this.diadiemService.getAllDiaDiem().subscribe((response) => {
      this.diadiems = response.listDiaDiem;
    });
  }
  //Lay phan vung
  getPhanVung() {
    this.phanvungService.getPhanVung().subscribe((response) => {
      this.phanvungs = response.listPhanVung;
    });
  }
  //Lay the loai
  getTheLoai() {
    this.theloaiService.getTheLoai().subscribe((response) => {
      this.theloais = response.listTheLoai;
    });
  }
}
