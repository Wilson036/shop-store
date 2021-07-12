import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../model/item';
import { StoreService } from '../store.service';
import { Request } from '../model/Request';
import { Response } from '../model/Response';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  stores: Item[] = [];

  constructor(private storeService: StoreService, private router: Router) {}

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

  goFormPage() {
    this.router.navigate(['new']);
  }
}
