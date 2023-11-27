
export interface IConsolidationTrayForTechnicianCollection {
  searchParam?: string;
  cutParamName?: string;
  cutParamId?: number;
  identification?: string; //El documento parameter para consultar atención ciudadana
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

  countSpinProjected?: number;
  countSpins?: number;
  contactNumber?: string;
  email?: string;
  dateIncome?: Date;
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


export interface CitizenAttentionDataExternal {
  pqrsdf_result: PqrsdfResult[];
}

export interface PqrsdfResult {
  id?:                 number;
  requestTypeId?:      number;
  personId?:           number;
  responseMediumId?:   number;
  requestSubjectId?:   number;
  clasification?:      string;
  filingNumber?:       number;
  answer?:             null;
  answerDate?:         null;
  dependency?:         string;
  description?:        string;
  fileId?:             number;
  createdAt?:          Date;
  updatedAt?:          Date | null;
  statusId?:           number;
  responsibleId?:      number;
  idCanalesAttencion?: number | null;
  programId?:          number | null;
  closedAt?:           null;
  person?:             Person;
  status?:             Status;
  canalesAttencion?:   CanalesAttencion | null;
  requestSubject?:     RequestSubject;
  responseMedium?:     ResponseMedium;
  requestType?:        RequestType;
  program?:            Program | null;
}

export interface CanalesAttencion {
  cad_codigo:   number;
  cad_nombre:   string;
  cad_id_canal: number;
  cad_activo:   number;
  cad_orden:    number;
}

export interface Person {
  id:                  number;
  identification:      string;
  documentTypeId:      number;
  entityTypeId:        number;
  firstName:           string;
  secondName:          string;
  firstSurname:        string;
  secondSurname:       string;
  birthdate:           Date;
  firstContactNumber:  string;
  secondContactNumber: string;
  email:               string;
  address:             string;
  countryId:           number;
  departmentId:        number;
  municipalityId:      number;
  isBeneficiary:       number;
  createdAt:           Date;
  updatedAt:           Date;
}

export interface Program {
  prg_codigo:        number;
  prg_descripcion:   string;
  prg_clasificacion: number;
  prg_dependencia:   number;
  prg_activo:        number;
  prg_orden:         number;
}

export interface RequestSubject {
  aso_codigo:      number;
  aso_asunto:      string;
  aso_activo:      number;
  aso_orden:       number;
  requestObjectId: number;
  createdAt:       Date;
  updatedAt:       null;
}

export interface RequestType {
  tso_codigo:      number;
  tso_description: string;
  tso_activo:      number;
  tso_orden:       number;
}

export interface ResponseMedium {
  mre_codigo:      number;
  mre_descripcion: string;
  mre_activo:      number;
  mre_orden:       number;
}

export interface Status {
  lep_codigo: number;
  lep_estado: string;
  lep_activo: number;
  lep_orden:  number;
}

export interface PqrsdfResultSimple {
  numberPqrsdf: number;
  dateFiled: Date | string;
  program: string;
  clasify: string;
  reason: string;
  state: string;
  answerDate: Date | string;
  answer: string;
}

