import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-congtys-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class CongTysEditComponent implements OnInit {
  public isCollapsed = false;

  collapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}
