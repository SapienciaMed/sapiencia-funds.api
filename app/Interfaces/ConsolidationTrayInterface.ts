
export interface IConsolidationTray {
  searchParam?: string;
  cutParamName?: string;
  cutParamId?: number;
  identification?: string; //El documento parameter para consultar atención ciudadana y también sirve para lo del reglamento
  idBeneficiary?: number; //Para traerme requerimientos del reglamento
  legalPeriod?: string; //Para traerme requerimientos del reglamento
  user?: string; //Usuario que me llega desde el Front
  statusPaccSearch?: number; //Para filtar entre las tabs de Pacc -> //*¡¡¡ RE UTILIZACIÓN !!!*//
  page?: number,
  perPage?: number;
}

export interface IChageStatusKnowledgeTransfer {
  id: number;
  idBeneficiary: number;
  status: boolean;
  observations: string;
  user: string;
  workedHours: number;
  statusPaccSearch?: number;
}

export interface IConsolidationTrayForTransactions {
  id?: number;
  cut?: number;
}

export interface IConsolidationTrayParams {
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
  idStatusProcessPacc: number;
  statusProcessPacc: string;
  statusSapiencia: number;
  countSemesterProjected: number;
  countSpinProjected: number;
  countSpins: number;
  periodUltimaeSpin: string;
  countRenew: number;
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
  cuts: ICuts;
  programs: IPrograms;
  statusPacc: IStatusPacc;
}

export interface ICuts {
  id: number;
  name: string;
  from: string; //Date, pero colocamos string por errores tipado.
  until: string; //Date, pero colocamos string por errores tipado.
  modifyUser: null;
  modifyDate: null;
  createUser: string;
  createDate: Date;
}

export interface IPrograms {
  id: number;
  value: string;
}

export interface IStatusPacc {
  id: number;
  description: string;
}

export interface ICitizenAttentionDataExternal {
  pqrsdf_result: IPqrsdfResult[];
}

export interface IPqrsdfResult {
  id?: number;
  requestTypeId?: number;
  personId?: number;
  responseMediumId?: number;
  requestSubjectId?: number;
  clasification?: string;
  filingNumber?: number;
  answer?: null;
  answerDate?: null;
  dependency?: string;
  description?: string;
  fileId?: number;
  createdAt?: Date;
  updatedAt?: Date | null;
  statusId?: number;
  responsibleId?: number;
  idCanalesAttencion?: number | null;
  programId?: number | null;
  closedAt?: null;
  person?: IPerson;
  status?: IStatus;
  canalesAttencion?: ICanalesAttencion | null;
  requestSubject?: IRequestSubject;
  responseMedium?: IResponseMedium;
  requestType?: IRequestType;
  program?: IProgram | null;
  file?: IFile | null;
}

export interface ICanalesAttencion {
  cad_codigo: number;
  cad_nombre: string;
  cad_id_canal: number;
  cad_activo: number;
  cad_orden: number;
}

export interface IPerson {
  id: number;
  identification: string;
  documentTypeId: number;
  entityTypeId: number;
  firstName: string;
  secondName: string;
  firstSurname: string;
  secondSurname: string;
  birthdate: Date;
  firstContactNumber: string;
  secondContactNumber: string;
  email: string;
  address: string;
  countryId: number;
  departmentId: number;
  municipalityId: number;
  isBeneficiary: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProgram {
  prg_codigo: number;
  prg_descripcion: string;
  prg_clasificacion: number;
  prg_dependencia: number;
  prg_activo: number;
  prg_orden: number;
}

export interface IRequestSubject {
  aso_codigo: number;
  aso_asunto: string;
  aso_activo: number;
  aso_orden: number;
  requestObjectId: number;
  createdAt: Date;
  updatedAt: null;
}

export interface IRequestType {
  tso_codigo: number;
  tso_description: string;
  tso_activo: number;
  tso_orden: number;
}

export interface IResponseMedium {
  mre_codigo: number;
  mre_descripcion: string;
  mre_activo: number;
  mre_orden: number;
}

export interface IStatus {
  lep_codigo: number;
  lep_estado: string;
  lep_activo: number;
  lep_orden: number;
}

export interface IPqrsdfResultSimple {
  numberPqrsdf: number;
  dateFiled: Date | string;
  program: string;
  clasify: string;
  reason: string;
  state: string;
  answerDate: Date | string;
  answer: string;
  completePath: string;
  nameFile: string;
  nameRoute: string;
  fullPath64: string;
}

export interface IRequerimentsResultSimple {
  id?: number;
  idBeneficiary: number;
  idReglament: number;
  idRequirement: number;
  descriptionRequirement: string;
  activeRequirement: boolean
  percentRequirement: number | null;
  accomplished?: boolean;
  mandatoryFor?: string;
}

export interface IComplianceAssignment {
  idRequirementConsolidate: number;
  newStatus: boolean;
}

export interface IApplyKnowledgeTransfer {
  id?: number;
  idBeneficiary: number;
  idReglament: number;
  committedHours: number;
  workedHours: number;
  pendingHours: number;
  percentTransfer: number;
  status: boolean;
  idStatusProcessPacc: number;
  observations: string;
  userCreate: string;
  dateCreate: Date;
}

export interface IFile {
  id?: number;
  name: string;
  isActive: boolean;
  filePath?: string;
}
