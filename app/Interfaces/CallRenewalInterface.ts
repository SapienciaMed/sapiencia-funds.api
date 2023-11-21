export interface ICallRenewal {
  period: string;
  fund: string;
  enabled: number;
  renewed: number;
  percentage: string;
  }
  
  export interface ICallRenewalFilters {
    period: number;
    page: number;
    perPage: number;
  }