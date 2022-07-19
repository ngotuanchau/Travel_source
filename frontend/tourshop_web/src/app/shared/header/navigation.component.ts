import { Component, AfterViewInit, EventEmitter, Output } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../service/auth.service";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";

declare var $: any;

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  loginStatus = this.service.IsLoggedIn;
  idLogin = localStorage.getItem("id");
  role: string;
  name = localStorage.getItem("hoTen");
  email = localStorage.getItem("email");
  avt = localStorage.getItem("avt");
  checkRole() {
    if (this.service.HaveAccessAdmin()) {
      return true;
    } else return false;
  }

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = true;

  constructor(private modalService: NgbModal, private service: AuthService) {}

  ngAfterViewInit() {}
}
