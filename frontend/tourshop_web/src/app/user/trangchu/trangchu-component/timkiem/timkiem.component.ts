import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DiadiemsService } from "../../../../service/diadiems.service";
import { TheloaisService } from "../../../../service/theloais.service";
import { ToursService } from "../../../../service/tours.service";

@Component({
  selector: "app-timkiem",
  templateUrl: "./timkiem.component.html",
  styleUrls: ["./timkiem.component.scss"],
})
export class TimkiemComponent implements OnInit {
  constructor(
    private tourservice: ToursService,
    private theloaiService: TheloaisService,
    private diadiemService: DiadiemsService,
    private routes: Router
  ) {}

  ngOnInit(): void {
    this.getTheLoai();
    this.getAllDiaDiem();
  }

  theloais: any;
  //Lay the loai
  getTheLoai() {
    this.theloaiService.getTheLoai().subscribe((response) => {
      this.theloais = response.listTheLoai;
    });
  }
  findTLById(id: number) {
    return this.theloais.find((item: any) => item.id == id)?.tenLoai;
  }
  diadiems: any;
  //Lay tat ca dia diem
  getAllDiaDiem() {
    this.diadiemService.getAllDiaDiem().subscribe((response) => {
      this.diadiems = response.listDiaDiem;
    });
  }
  findDDById(id: number) {
    return this.diadiems.find((item: any) => item.id == id)?.ten;
  }

  onSearch() {
    this.routes.navigate(["search"]);
  }
}
