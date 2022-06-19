import { DiaDiemTour } from "./diadiem-tour.model";
import { DiaDiem } from "./diadiem.model";
import { Lichtrinh } from "./lichtrinh.model";
import { PhanVung } from "./phanvung.model";
import { TheLoai } from "./theloai.model";
import { NgayKhoiHanh } from "./thoigian.model";

export interface Tour {
  id: number;
  tentour: string;
  theloai: TheLoai;
  phanvung: PhanVung;
  congty: number;
  veToiDa: number;
  veToiThieu: number;
  soNgay: number;
  soDem: number;
  diemDi: DiaDiem;
  diemDen: DiaDiem;
  mota: string;
  amThuc: any;
  luuTru: any;
  phuongtien: any;
  anhTour: any;
  nhungNgayKhoiHanh: NgayKhoiHanh[];
  nhungdiadiem: DiaDiemTour[];
  lichtrinh: Lichtrinh[];
}
