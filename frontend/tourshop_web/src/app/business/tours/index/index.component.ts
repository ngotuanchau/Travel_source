import { Component } from "@angular/core";
import { TheloaisService } from "../../../service/theloais.service";
import { ToursService } from "../../../service/tours.service";
import { DiadiemsService } from "../../../service/diadiems.service";

@Component({
  selector: "app-tours",
  templateUrl: "index.component.html",
  styleUrls: ["index.component.scss"],
})
export class ToursIndexComponent {
  tours: any;
  getAllTours() {
    const id = localStorage.getItem("id");
    this.tourservice.getAllTourBusinessId(id).subscribe((response) => {
      this.tours = response;
      console.log(this.tours);
    });
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
    this.diadiemService.getDiaDiem().subscribe((response) => {
      this.diadiems = response.listDiaDiem;
    });
  }
  findDDById(id: number) {
    return this.diadiems.find((item: any) => item.id == id)?.tendiadiem;
  }
  constructor(
    private tourservice: ToursService,
    private theloaiService: TheloaisService,
    private diadiemService: DiadiemsService
  ) {}
  ngOnInit() {
    this.getAllTours();
    this.getTheLoai();
    this.getAllDiaDiem();
    console.log(this.getTourByIdTheLoai(2));
  }
  getTourByIdTheLoai(id: any) {
    let list: any;
    list = [];
    for (let u of this.tours) {
      if (u.theloai == id) {
        list.push(u);
      }
    }
    return list;
  }
}
