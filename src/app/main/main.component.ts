import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../model/item';
import { StoreService } from '../store.service';
import { MessageService } from 'primeng/api';
import { Request } from '../model/Request';
import { Response } from '../model/Response';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  stores: Item[] = [];
  storeName = '';
  storeId = 0;
  res: Request = {
    storeName: '',
    page: {
      pageNumber: '1',
      pageSize: '3',
    },
  };
  @ViewChild('dt', { static: true })
  dt!: TableComponent;
  constructor(
    private storeService: StoreService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.storeService.getStores(this.res).subscribe((resp: Response) => {
      if (resp.isSuccess) {
        this.stores = resp.data?.items || [];
      }
    });
  }

  goFormPage() {
    this.router.navigate(['new']);
  }

  reset() {
    this.dt.reset();
    this.storeId = 0;
    this.storeName = '';
  }

  getStoreId($event: any) {
    this.storeId = $event;
    console.log(this.storeId);
  }
}
