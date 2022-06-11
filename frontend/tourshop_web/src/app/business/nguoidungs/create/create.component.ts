import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nguoidungs-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class NguoiDungsCreateComponent implements OnInit {
  public isCollapsed = false;

  collapsed = true;
  constructor() { }

  ngOnInit(): void {

  }

}
