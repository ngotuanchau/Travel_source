import { Component, OnInit } from "@angular/core";
import { DatePipe } from "@angular/common";
import { NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { NguoiDungsService } from "../../../../service/nguoidungs.service";

@Component({
  selector: "app-nguoidungs",
  templateUrl: "index.component.html",
  styleUrls: ["index.component.scss"],
})
export class NguoiDungsIndexComponent implements OnInit {
  idLogin: any;
  pipe = new DatePipe("en-US");
  constructor(private nguoidungService: NguoiDungsService) {}
  ngOnInit(): void {
    this.getAllUser();
    this.idLogin = localStorage.getItem("id");
  }
  user: any;
  getAllUser() {
    this.user = [];
    this.nguoidungService.getAllUsers().subscribe((res) => {
      for (let u of res) {
        if (u.id != this.idLogin) {
          this.user.push(u);
        }
      }
    });
  }
  filterUserByStatus(status: any) {
    let list: any;
    list = [];
    for (let u of this.user) {
      if (u.trangThai == status) {
        list.push(u);
      }
    }
    return list;
  }
  lock(id: any) {
    this.nguoidungService.lock(id).subscribe((res) => {
      this.getAllUser();
    });
  }
  unlock(id: any) {
    this.nguoidungService.unlock(id).subscribe((res) => {
      this.getAllUser();
    });
  }
}
