import { Component, OnInit } from "@angular/core";
import { TheloaisService } from "../../../../service/theloais.service";

@Component({
  selector: "app-index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.scss"],
})
export class TheLoaiIndexComponent implements OnInit {
  theloais: any;
  constructor(private theloaiService: TheloaisService) {}

  ngOnInit(): void {
    this.getAllTheLoai();
  }
  getAllTheLoai() {
    this.theloais = [];
    this.theloaiService.getTheLoai().subscribe((res) => {
      this.theloais = res.listTheLoai;
    });
  }
}
