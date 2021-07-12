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
  ];

  constructor() {}

  getStores(res: Request): Observable<Response> {
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
