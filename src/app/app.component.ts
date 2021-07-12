import { Component } from '@angular/core';
import { Item } from './model/item';
import { StoreService } from './store.service';
import { Request } from './model/Request';
import { Response } from './model/Response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  stores: Item[] = [];

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    const res: Request = {
      storeName: '',
      page: {
        pageNumber: '1',
        pageSize: '3',
      },
    };
    this.storeService.getStores(res).subscribe((resp: Response) => {
      if (resp.isSuccess) {
        this.stores = resp.data?.items || [];
      }
    });
  }
}
