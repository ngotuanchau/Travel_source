import { Component, OnInit } from '@angular/core';
import {CongTy,TopCongTy} from './top-congty-data';

@Component({
  selector: 'app-top-congty',
  templateUrl: './top-congty.component.html',
  styleUrls:['./top-congty.component.scss']
})
export class TopCongTyComponent implements OnInit {

  topCongTy:CongTy[];

  constructor() {

    this.topCongTy=TopCongTy;
  }

  ngOnInit(): void {
  }

}
