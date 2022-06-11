import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nguoidungs-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class NguoiDungsEditComponent implements OnInit {
  public isCollapsed = false;

  collapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}
