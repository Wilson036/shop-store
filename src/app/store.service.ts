import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from './model/item';
import { Response } from './model/Response';
import { Request } from './model/Request';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  stores: Item[] = [
    {
      storeId: 1,
      storeName: 'Apple',
      owner: 'Steven',
      tel: '02123345678',
      fax: '02123345678',
      mobile: '091222233',
      address: '台灣某個地方',
      evaluation: '1',
      remarks: '1',
      empName: 'Wilson',
      createDate: new Date(),
      createUser: '82649',
      msgName: null,
    },
    {
      storeId: 2,
      storeName: '微軟',
      owner: 'Bill',
      tel: '02123345678',
      fax: '02123345678',
      mobile: '091222233',
      address: '台灣某個地方',
      evaluation: '2',
      remarks: '1',
      empName: '蓋之',
      createDate: new Date(),
      createUser: '82649',
      msgName: null,
    },
    {
      storeId: 3,
      storeName: 'Google',
      owner: '蓋奇',
      tel: '02123345678',
      fax: '02123345678',
      mobile: '091222233',
      address: '台灣某個地方',
      evaluation: '2',
      remarks: '1',
      empName: '佩奇',
      createDate: new Date(),
      createUser: '82649',
      msgName: null,
    },
    {
      storeId: 4,
      storeName: '亞馬遜',
      owner: '貝佐斯',
      tel: '02123345678',
      fax: '02123345678',
      mobile: '091222233',
      address: '台灣某個地方',
      evaluation: '2',
      remarks: '1',
      empName: '阿木',
      createDate: new Date(),
      createUser: '82649',
      msgName: null,
    },
    {
      storeId: 5,
      storeName: '領英',
      owner: '史蒂夫',
      tel: '02123345678',
      fax: '02123345678',
      mobile: '091222233',
      address: '台灣某個地方',
      evaluation: '2',
      remarks: '1',
      empName: '小夫',
      createDate: new Date(),
      createUser: '82649',
      msgName: null,
    },
  ];

  constructor() {}

  getStores(res: Request): Observable<Response> {
    const name = res.storeName;
    if (name) {
      this.stores = this.stores.filter(({ storeName }) =>
        storeName.toLowerCase().includes(name.toLowerCase())
      );
    }

    const response: Response = {
      isSuccess: true,
      returnCode: null,
      returnMessage: null,
      data: {
        pageSize: null,
        pageNumber: null,
        totalPage: null,
        totalCount: null,
        items: this.stores,
      },
    };

    return of(response);
  }

  findStoreById(id: number): Observable<Response> {
    this.stores = this.stores.filter(({ storeId }) => storeId === id);
    const response: Response = {
      isSuccess: true,
      returnCode: null,
      returnMessage: null,
      data: {
        pageSize: null,
        pageNumber: null,
        totalPage: null,
        totalCount: null,
        items: this.stores,
      },
    };

    return of(response);
  }

  createNewStores(item: Item): Observable<Response> {
    const store: Item = {
      storeId: this.stores.length + 1,
      ...item,
      createDate: new Date(),
    };
    this.stores.push(store);
    const response: Response = {
      isSuccess: true,
      returnCode: null,
      returnMessage: null,
      data: {
        pageSize: null,
        pageNumber: null,
        totalPage: null,
        totalCount: null,
        items: this.stores,
      },
    };
    return of(response);
  }

  delete(id: number): Observable<Response> {
    this.stores = this.stores.filter(({ storeId }) => storeId !== id);
    const response: Response = {
      isSuccess: true,
      returnCode: null,
      returnMessage: null,
      data: {
        pageSize: null,
        pageNumber: null,
        totalPage: null,
        totalCount: null,
        items: this.stores,
      },
    };
    return of(response);
  }
}
