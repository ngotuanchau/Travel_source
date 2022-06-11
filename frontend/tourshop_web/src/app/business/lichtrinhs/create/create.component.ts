import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lich-trinh-tours-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class LichTrinhsCreateComponent implements OnInit {
  public isCollapsed = false;

  collapsed = true;
  constructor() { }

  ngOnInit(): void {

  }

}
