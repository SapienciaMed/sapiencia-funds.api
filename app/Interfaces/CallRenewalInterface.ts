export interface ICallRenewal {
    Fondo: number;
    No_Habilitados: number;
    No_Renovados: number;
    Porcentaje: number;
  }
  
  export interface ICallRenewalFilters {
    periodo: number;
    page: number;
    perPage: number;
  }