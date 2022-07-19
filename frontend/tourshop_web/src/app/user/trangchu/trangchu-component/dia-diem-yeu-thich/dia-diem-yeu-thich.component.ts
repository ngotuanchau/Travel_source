import { Component, OnInit } from "@angular/core";
import { ToursService } from "../../../../service/tours.service";
import { DiadiemsService } from "../../../../service/diadiems.service";
@Component({
  selector: "app-dia-diem-yeu-thich",
  templateUrl: "./dia-diem-yeu-thich.component.html",
  styleUrls: ["./dia-diem-yeu-thich.component.scss"],
})
export class DiaDiemYeuThichComponent implements OnInit {
  title: string = "Điểm đến yêu thích trong nước";
  subTitle: string = "Lên rừng xuống biển. Trọn vẹn Việt Nam";
  diadiem: any;
  constructor(
    private diadiemService: DiadiemsService,
    private tourService: ToursService
  ) {}

  ngOnInit(): void {
    this.getDiaDiem();
  }
  getDiaDiem() {
    this.diadiem = [];
    this.diadiemService.getDiaDiem().subscribe((res) => {
      this.diadiem = res.listDiaDiem;
    });
  }
}
