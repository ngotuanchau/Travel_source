import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit {

  constructor(private routes:Router,) { }

  ngOnInit(): void {
  }
  datNgay(){
    this.routes.navigate(['../booking']);
  }

}
