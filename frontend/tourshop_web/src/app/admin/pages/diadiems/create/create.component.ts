import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diadiems-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class DiaDiemsCreateComponent implements OnInit {
  public isCollapsed = false;

  collapsed = true;
  constructor() { }

  ngOnInit(): void {

  }

}
