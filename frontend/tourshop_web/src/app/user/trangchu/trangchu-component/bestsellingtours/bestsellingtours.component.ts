import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bestsellingtours',
  templateUrl: './bestsellingtours.component.html',
  styleUrls: ['./bestsellingtours.component.scss']
})
export class BestsellingtoursComponent implements OnInit {

  constructor(private routes:Router,) { }

  ngOnInit(): void {
  }
  viewAll(){
    this.routes.navigate(['/detail']);
  }
}
