import { Component, OnInit } from "@angular/core";
import { NgbNavChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { DiadiemsService } from "../../../../service/diadiems.service";

@Component({
  selector: "app-diadiems",
  templateUrl: "index.component.html",
  styleUrls: ["index.component.css"],
})
export class DiaDiemsIndexComponent implements OnInit {
  constructor(private diadiemService: DiadiemsService) {}
  ngOnInit(): void {
    this.getAllDiaDiem();
  }
  diadiems: any;
  //Lay tat ca dia diem
  getAllDiaDiem() {
    this.diadiemService.getAllDiaDiem().subscribe((response) => {
      this.diadiems = response.listDiaDiem;
    });
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
}
