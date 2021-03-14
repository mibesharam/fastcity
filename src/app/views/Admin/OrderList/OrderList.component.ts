import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-OrderList',
  templateUrl: './OrderList.component.html',
  styleUrls: ['./OrderList.component.scss']
})
export class OrderListComponent implements OnInit {
  FromDate = new FormControl(new Date());
  ToDate = new FormControl(new Date());
  FilterStr: string = "All";
  constructor() { }

  ngOnInit() {
  }

}
