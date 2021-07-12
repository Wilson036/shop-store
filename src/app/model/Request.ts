export interface Request {
  storeName: string;
  page: Page;
}

interface Page {
  pageNumber: string;
  pageSize: string;
}
