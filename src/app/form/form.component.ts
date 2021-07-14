import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
    storeName: new FormControl('super google', Validators.required),
    owner: new FormControl('wilson'),
    tel: new FormControl('021234567', Validators.required),
    fax: new FormControl('021234456'),
    mobile: new FormControl('091234556'),
    address: new FormControl('taipei'),
    evaluation: new FormControl('1'),
    remarks: new FormControl('讚讚讚'),
  });
  constructor(
    private router: Router,
    private messageService: MessageService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {}

  addStore() {
    if (this.storeForm.invalid) {
      return;
    }
    this.storeService
      .createNewStores(this.storeForm.value)
      .subscribe((resp: Response) => {
        if (resp.isSuccess) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Message Content',
          });
        }
      });
  }
  reset() {
    this.storeForm.reset();
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  }

  back() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
    this.router.navigate(['']);
  }
}
