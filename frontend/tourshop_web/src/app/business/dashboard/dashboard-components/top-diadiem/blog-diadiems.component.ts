import { Component, OnInit } from '@angular/core';
import {diaDiem, diaDiems} from './blog-diadiems-data';

@Component({
  selector: 'app-blog-cards',
  templateUrl: './blog-diadiems.component.html',
  styleUrls:['./blog-diadiems.component.scss'],
})
export class BlogCardsComponent implements OnInit {

  diaDiems:diaDiem[];

  constructor() {

    this.diaDiems=diaDiems;
  }

  ngOnInit(): void {
  }

}
