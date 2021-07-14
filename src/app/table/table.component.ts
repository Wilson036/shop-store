import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  storeSelect = null;

  @Output()
  SetIdEvent = new EventEmitter<number>();

  ngOnInit(): void {}

  setValues(storeId: number) {
    this.SetIdEvent.emit(storeId);
  }

  reset() {
    this.storeSelect = null;
  }
}
