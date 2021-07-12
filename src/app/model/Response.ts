import { Item } from './item';

export interface Response {
  isSuccess: boolean;
  returnCode: string | null;
  returnMessage: string | null;
  data: Data | null;
}

interface Data {
  pageSize: number | null;
  pageNumber: number | null;
  totalCount: number | null;
  totalPage: number | null;
  items: Item[] | null;
}
