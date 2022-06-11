import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tours-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class ToursEditComponent implements OnInit {
  public isCollapsed = false;

  collapsed = true;
  constructor() { }

  ngOnInit(): void {
  }

}
