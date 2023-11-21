export interface IBeneficiariesConsolidateInterface {
  id?: number | any;
  name: string;
  from: string;
  until: string;
  modifyUser?: string;
  modifyDate?: string;
  createUser: string;
  createDate: string;
}

export interface IBeneficiariesConsolidateFiltersInterface {
  name: string;
  from: string;
  until: string;
  page: number;
  perPage: number;
}
