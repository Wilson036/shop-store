export interface Item {
  storeId?: number;
  storeName: string;
  owner: string;
  tel: string;
  fax: string;
  mobile: string | null;
  address: string | null;
  evaluation: string;
  remarks: string | null;
  empName: string;
  createDate?: Date;
  createUser: string;
  msgName: string | null;
}
