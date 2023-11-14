export interface ICallRenewal {
    periodo: number;
    id_comuna: number;
    nro_habilitado: number;
    nro_renovado: number;
    porcentaje: number;
  }
  
  export interface ICallRenewalFilters {
    id_comuna: number | number[] | string;
    periodo: number;
    page: number;
    perPage: number;
  }