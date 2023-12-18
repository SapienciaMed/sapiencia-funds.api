export interface ICallRenewal {
  period: string;
  fund: string;
  enabled: number;
  renewed: number;
  percentage: string;
}
export interface IPrueba {
  fund: string;
  enabled: number;
  renewed: number;
  percentage: string;
}

export interface IUpdateRenewal {
  enabled: number;
}

export interface ICallRenewalFilters {
  period: number;
  page: number;
  perPage: number;
}
export interface ICallRenewalFiltersp {
  period: number;

}

export interface ICallRenewalBecas {
  fund: string;
  period: number
}