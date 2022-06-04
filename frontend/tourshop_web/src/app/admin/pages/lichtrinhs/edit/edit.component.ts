import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lich-trinh-tours-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class LichTrinhsEditComponent implements OnInit {
  public isCollapsed = false;

  collapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}
