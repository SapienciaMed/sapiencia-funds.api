
export interface IConsolidationTrayForTechnicianCollection {
  searchParam?: string;
  cutParamName?: string; //TODO: Revisar
  cutParamId?: number; //TODO: Revisar
  page: number,
  perPage: number;
}

export interface IConsolidationTrayForTransactions {
  id?: number;
  cut?: number;
}

export interface IConsolidationTrayForTechnicianCollectionParams {
  idBenef?: number;
  idCut?: number;
  idProgram?: number;
  creditId: number;
  nroFiducy: number;
  document: string;
  fullName: string;
  program: string;
  legalDate: string;
  dateIncomeCut: string; //Date, pero colocamos string por errores tipado.
  cut: string;
  dateFinallyCut: string; //Date, pero colocamos string por errores tipado.
  dateEndGracePeriod: Date | null;
  status: string;
  reason: string;
  characterization: string;
  currentResponsible: string;
}

export interface InitialBeneficiaryInformation {
  id: number;
  dateCarry: Date;
  dateMark: Date;
  idProgram: number;
  idCut: number;
  numberDocument: string;
  creditNumber: number;
  fiducyContractNumber: number;
  legalPeriod: string;
  countSuspendContinues: number;
  countSuspendDiscontinues: number;
  countSuspendSpecials: number;
  statusProcess: string;
  statusSapiencia: number;
  countSemesterProjected: number;
  countSpinProjected: number;
  countSpins: number;
  periodUltimaeSpin: string;
  countRenew: number;
  nroFiducyContract: string;
  dateDepartmentReturn: Date;
  dateIncome: Date;
  gracePeriod: string;
  dateInitialGracePeriod: null;
  dateEndGracePeriod: null;
  fullName: string;
  email: string;
  contactNumber: string;
  reason: string;
  characterization: string;
  currentManager: string;
  cuts: Cuts;
  programs: Programs;
}

export interface Cuts {
  id: number;
  name: string;
  from: string; //Date, pero colocamos string por errores tipado.
  until: string; //Date, pero colocamos string por errores tipado.
  modifyUser: null;
  modifyDate: null;
  createUser: string;
  createDate: Date;
}

export interface Programs {
  id: number;
  value: string;
}
