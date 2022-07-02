import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Tour, BestSellings } from "./bestselling.data";

@Component({
  selector: "app-bestsellingtours",
  templateUrl: "./bestsellingtours.component.html",
  styleUrls: ["./bestsellingtours.component.scss"],
})
export class BestsellingtoursComponent implements OnInit {
  title = "Tour đang hot";
  subTitle = "Cuộc sống là một cuộc phiêu lưu đầy táo bạo hoặc không là gì cả";
  lstBS: Tour[];
  constructor(private routes: Router) {}

  ngOnInit(): void {
    this.lstBS = BestSellings;
  }
  viewAll() {
    this.routes.navigate(["/detail"]);
  }
}
