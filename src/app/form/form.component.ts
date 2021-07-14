import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StoreService } from '../store.service';
import { Response } from '../model/Response';
import { Item } from '../model/item';

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
  storeId = 0;
  storeForm = new FormGroup({
    storeName: new FormControl('super google', Validators.required),
    owner: new FormControl('wilson'),
    tel: new FormControl('021234567', [
      Validators.required,
      Validators.pattern(/^[0-9\s]*$/),
      Validators.maxLength(15),
    ]),
    fax: new FormControl('021234456', [
      Validators.pattern(/^[0-9\s]*$/),
      Validators.maxLength(15),
    ]),
    mobile: new FormControl('091234556', [
      Validators.pattern(/^[0-9\s]*$/),
      Validators.maxLength(15),
    ]),
    address: new FormControl('taipei'),
    evaluation: new FormControl('1'),
    remarks: new FormControl('讚讚讚'),
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.storeId = Number(this.route.snapshot.params.id);
    if (this.storeId) {
      this.storeService
        .findStoreById(this.storeId)
        .subscribe((resp: Response) => {
          if (resp.isSuccess && resp.data?.items?.length) {
            const {
              storeName,
              owner,
              tel,
              fax,
              mobile,
              address,
              evaluation,
              remarks,
            } = (resp.data.items || [])[0];

            this.storeForm.setValue({
              storeName,
              owner,
              tel,
              fax,
              mobile,
              address,
              evaluation,
              remarks,
            });
          }
        });
    }
  }

  addStore() {
    if (this.storeForm.invalid) {
      return;
    }
    this.storeService.createNewStores(this.storeForm.value).subscribe(
      (resp: Response) => {
        if (resp.isSuccess) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: '新增成功',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: '新增失敗',
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

  update() {
    if (this.storeForm.invalid) {
      return;
    }
    const store: Item = {
      storeId: this.storeId,
      ...this.storeForm.value,
      createDate: new Date(),
    };
    this.storeService.update(store).subscribe(
      (resp: Response) => {
        if (resp.isSuccess) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: '更新成功',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: '更新失敗',
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
