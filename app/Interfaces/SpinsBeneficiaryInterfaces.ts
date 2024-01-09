export interface ISpinsBeneficiary {
  page?: number;
  perPage?: number;
  userId?: number;
  documentNumber?: string;
}

export interface ISearchInResource1 {

  creditId: string; //TODO -> Nos tocará creo consultar la view de Juan Mauricio
  fiducyContract: string;
  legalPeriod: string;
  documentBeneficiary: number;
  fundId: number;
  fundName: string;
  projectedSemesters: number;
  modality: string | number;
  periods: number;
  enrollmentProjectecValue: number;
  sustentedProjectecValue: number;
  semestersRenew: number;
  enrollmentRenewValue: number;
  sustentedRenewValue: number;
  enrollmentSpinValue: number;
  sustentedSpinValue: number;

}
