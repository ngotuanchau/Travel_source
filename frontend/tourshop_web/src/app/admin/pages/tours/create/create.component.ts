import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tours-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class ToursCreateComponent implements OnInit {
  public isCollapsed = false;

  collapsed = true;
  constructor() { }

  ngOnInit(): void {

  }

}
