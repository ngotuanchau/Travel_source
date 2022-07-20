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
  pipe = new DatePipe("en-US");
  constructor(private nguoidungService: NguoiDungsService) {}
  ngOnInit(): void {
    this.getAllUser();
  }
  user: any;
  getAllUser() {
    this.user = [];
    this.nguoidungService.getAllUsers().subscribe((res) => {
      this.user = res;
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
  //Nav
  currentJustify = "start";

  active = 1;
  activev = "top";

  activeKeep = 1;

  activeSelected = 1;
  disabled = true;

  tabs = [1, 2, 3, 4, 5];
  counter = this.tabs.length + 1;
  activeDynamic = 1;

  onNavChange(changeEvent: NgbNavChangeEvent) {
    if (changeEvent.nextId === 3) {
      changeEvent.preventDefault();
    }
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.activeSelected = 1;
    }
  }

  close(event: MouseEvent, toRemove: number) {
    this.tabs = this.tabs.filter((id) => id !== toRemove);
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  add(event: MouseEvent) {
    this.tabs.push(this.counter++);
    event.preventDefault();
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
