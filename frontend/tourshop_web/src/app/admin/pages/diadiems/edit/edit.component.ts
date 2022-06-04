import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diadiems-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class DiaDiemsEditComponent implements OnInit {
  public isCollapsed = false;

  collapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}
