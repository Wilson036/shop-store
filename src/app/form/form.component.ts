import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StoreService } from '../store.service';
import { Response } from '../model/Response';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  options = [
    { label: '讚', value: '1' },
    { label: '大', value: '2' },
    { label: '低', value: '3' },
    { label: '拒絕往來戶', value: '4' },
  ];

  date = new Date();
  storeForm = new FormGroup({
    storeName: new FormControl('', Validators.required),
    owner: new FormControl(''),
    tel: new FormControl('', Validators.required),
    fax: new FormControl(''),
    mobile: new FormControl(''),
    address: new FormControl(''),
    evaluation: new FormControl(''),
    remarks: new FormControl(''),
  });
  constructor(private router: Router, private storeService: StoreService) {}

  ngOnInit(): void {}

  addStore() {
    if (this.storeForm.invalid) {
      return;
    }
    this.storeService
      .createNewStores(this.storeForm.value)
      .subscribe((resp: Response) => {
        if (resp.isSuccess) {
          this.router.navigate(['']);
        }
      });
  }
  reset() {
    this.storeForm.reset();
  }

  back() {
    this.router.navigate(['']);
  }
}
