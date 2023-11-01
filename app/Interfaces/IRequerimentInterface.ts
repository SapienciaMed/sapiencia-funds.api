export interface IRequerimentInterface {
  id?: number;
  codReglament?: number;
  status?: boolean;
  percent?: number;
  description: string;
}

export interface IRequerimentFiltersInterface {
  codReglament?: number;
  percent?: number;
  page: number;
  perPage: number;
}

export interface IRequerimentUpdateInterface {
  id?: number;
  status?: boolean;
}
