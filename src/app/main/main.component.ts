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
    this.storeService.getStores(this.res).subscribe(
      (resp: Response) => {
        if (resp.isSuccess) {
          this.stores = resp.data?.items || [];
        }
      },
      (err) => {
        console.error({ err });
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: '發生錯誤',
        });
      }
    );
  }

  goFormPage() {
    this.router.navigate(['new']);
  }
  getStoreId($event: any) {
    this.storeId = $event;
  }

  delete() {
    if (!this.storeId) {
      this.messageService.add({
        severity: 'warn',
        summary: 'warn',
        detail: '請先選一筆店家資訊',
      });
      return;
    }
    this.storeService.delete(this.storeId).subscribe(
      (resp: Response) => {
        if (resp.isSuccess) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: '刪除成功',
          });
          this.stores = this.stores.filter(
            ({ storeId }) => storeId !== this.storeId
          );
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: '刪除失敗',
          });
        }
      },
      (err) => {
        console.error({ err });
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: '發生錯誤',
        });
      }
    );
  }

  modify() {
    if (!this.storeId) {
      this.messageService.add({
        severity: 'warn',
        summary: 'warn',
        detail: '請先選一筆店家資訊',
      });
      return;
    }
  }

  reset() {
    this.dt.reset();
    this.storeId = 0;
    this.storeName = '';
  }
}
