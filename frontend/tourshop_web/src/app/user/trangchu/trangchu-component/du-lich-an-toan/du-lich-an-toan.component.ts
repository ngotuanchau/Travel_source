import { Component, OnInit } from "@angular/core";
import { DLAT, DuLichAnToan } from "./du-lich-an-toan-data";

@Component({
  selector: "app-du-lich-an-toan",
  templateUrl: "./du-lich-an-toan.component.html",
  styleUrls: ["./du-lich-an-toan.component.scss"],
})
export class DuLichAnToanComponent implements OnInit {
  dlats: DLAT[];
  constructor() {
    this.dlats = DuLichAnToan;
  }

  ngOnInit(): void {}
}
