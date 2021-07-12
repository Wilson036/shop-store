import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../model/item';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor() {}

  @Input()
  stores: Item[] = [];

  ngOnInit(): void {}

  setValues(store: Item) {
    console.log({ store });
  }
}
