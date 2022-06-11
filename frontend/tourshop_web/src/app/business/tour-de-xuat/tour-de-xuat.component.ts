import { Component, OnInit } from '@angular/core';
import{Tours, Employee} from '../tours/tour-data'

@Component({
  selector: 'app-tour-de-xuat',
  templateUrl: './tour-de-xuat.component.html',
  styleUrls: ['./tour-de-xuat.component.scss']
})
export class TourDeXuatComponent implements OnInit {
  trow:Tours[];
  constructor() { this.trow=Employee;}

  ngOnInit(): void {
  }

}
