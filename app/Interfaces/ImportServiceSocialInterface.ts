export interface IImportServiceSocial {
    id?: number;
    period?: number;
    pSelection?: string | number;
    name?: string;
    communeBeneficiary?: string;
    modalityBenefit?: string;
    periodRenew?: number | string | null;
    semesterLevelRenew?: string | number;
    accumulatedAverage?: string;
    performService?: string | null;
    hoursServicePerform?: string | number | null;
    operator?: string;
  }
  
  export interface IValidateServiceSocial {
    legalizationPeriod?: string;
    consolidationBeneficiary?: number;
    hoursBorrowed?: number | null;
  }

  export interface IInsertServiceSocial {
    legalizationPeriod?: string;
    consolidationBeneficiary?: number;
    hoursBorrowed?: number | null;
    supportDocumentRoute?: string;
  }
  