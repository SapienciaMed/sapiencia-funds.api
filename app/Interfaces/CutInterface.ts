export interface ICutInterface {
  id?: number | any;
  name: string;
  from: string;
  until: string;
  modifyUser?: string;
  modifyDate?: string;
  createUser: string;
  createDate: string;
}

export interface ICutFiltersInterface {
  name: string;
  from: string;
  until: string;
  page: number;
  perPage: number;
}
