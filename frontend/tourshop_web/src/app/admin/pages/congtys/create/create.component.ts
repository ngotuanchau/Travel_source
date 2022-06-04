import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-congtys-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CongTysCreateComponent implements OnInit {
  public isCollapsed = false;

  collapsed = true;
  constructor() { }

  ngOnInit(): void {

  }

}
