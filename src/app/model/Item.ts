export interface Item {
  storeId: number;
  storeName: string;
  owner: string;
  tel: string;
  fax: string;
  mobile?: string;
  address?: string;
  evaluation: string;
  remarks?: string;
  empName: string;
  createDate: Date;
  createUser: string;
  msgName: string | null;
}
