import { Component, OnInit } from "@angular/core";
import { Tour, BestSellings } from "./bestselling.data";
@Component({
  selector: "app-newtours",
  templateUrl: "./newtours.component.html",
  styleUrls: ["./newtours.component.scss"],
})
export class NewtoursComponent implements OnInit {
  title = "Tour nổi bật";
  subTitle = "Cuộc sống là một cuộc phiêu lưu đầy táo bạo hoặc không là gì cả";
  lstBS: Tour[];
  constructor() {}

  ngOnInit(): void {
    this.lstBS = BestSellings;
  }
}
