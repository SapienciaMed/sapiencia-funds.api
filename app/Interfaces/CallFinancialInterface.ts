export interface ICallFinancial {
    id_comuna: number;
    presupuesto_comuna: string;

  }
  
  export interface ICallFinancialFilters{
    id_comuna?: number;
    periodo: number;
    page: number;
    perPage: number;
  }
     