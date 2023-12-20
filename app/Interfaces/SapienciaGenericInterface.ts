export interface IFiltersForReglament {
  page: number;
  perPage: number;
  programId?: number;
  initialPeriod?: string;
  endPeriod?: string;
}

export interface ICallPeriodSapi {
  id: number;
  name: string;
  nameComplementary?: string;
  minimumSalary: number;
  status: string;
}

export interface IReglamentConsolidation {
  id?: number;
  idProgram?: number;

  //Para Periodo/Convocatoria
  initialPeriod?: string;
  isOpenPeriod?: boolean;
  endPeriod?: string;

  //Porcentaje teórico
  applyTheoreticalSemiannualPercent?: boolean; //?Nuevo (Aplica porcentaje teórico)
  theoreticalSemiannualPercent?: number; //?Nuevo (Porcentaje teórico)

  //Rendimiento Académico
  applyAcademicPerformancePercent?: boolean; //?Nuevo (Aplica porcentaje rendimiento académico)
  academicPerformancePercent?: number; //?Nuevo (Aplica porcentaje rendimiento académico)

  //Porcentaje Requisitos
  applyRequirementsPercent?: boolean; //?Nuevo (Aplica porcentaje de requisitos)
  requirementsPercent?: number; //?Nuevo (Aplica porcentaje de requisitos)

  //Aplica Servicio Social
  applySocialService?: boolean;
  socialServicePercent?: number;
  socialServiceHours?: number;
  socialServiceCondonationType?: string; //?Nuevo (Servicio social condonación)
  socialServiceCondonationPercent?: ICondonationPercent[]; //?Nuevo (Servicio social condonación)

  //Aplica Transferencia de Conocimiento
  applyKnowledgeTransfer?: boolean;
  knowledgeTransferPercent?: number;
  knowledgeTransferHours?: number;
  knowledgeTransferCondonationType?: string; //?Nuevo (Transferencia de Conocimiento condonación)
  knowledgeTransferCondonationPercent?: ICondonationPercent[]; //?Nuevo (Transferencia de Conocimiento condonación)

  //Aplica Periodo de Gracia
  applyGracePeriod?: boolean;
  gracePeriodMonths?: number;
  graceDateApplication?: string;

  //Aplica Suspenciones Continuas
  applyContinuousSuspension?: boolean;
  continuosSuspencionQuantity?: number;

  //Aplica Suspenciones Discontinuas
  applyDiscontinuousSuspension?: boolean;
  discontinuousSuspensionQuantity?: number;

  //Aplica Suspenciones Especiales
  applySpecialSuspensions?: boolean;
  specialSuspensionsQuantity?: number;

  //Aplica Prorroga
  applyExtension?: boolean;
  extensionQuantity?: number;

  //Tab siguiente, Aplica Condonación por Rendimiento Periodo
  applyCondonationPerformancePeriod?: boolean;
  performancePeriodStructure?: IPerformanceStructure | string; //? Acá se guardará el String JSON

  //Tab siguiente, Aplica Condonación por Rendimiento Acumulado
  applyAccomulatedIncomeCondonation?: boolean;
  accumulatedPerformanceDataTable?: IPerformanceStructure | string; //? Acá se guardará el String JSON

  //Información adicional de registro
  modifyUser?: string;
  modifyDate?: Date;
  createUser?: string;
  createDate?: Date;

  //Tab final, Requisitos (Los agregamos en paralelo a su respectiva tabla)
  requirementsForReglament?: IRequirementsForReglament[];

}

export interface IPerformanceStructure {
  percentCondonation: string | number;
  dataTable: ITableMicroStructure[]
}

export interface ICondonationPercent {
  maximumHourPercent: number;
  minimumHourPercent: number;
  condonationPercent: number;
}

export interface ITableMicroStructure {
  initialAverage: number;
  endAverage: number;
  percent: number;
  id?: string;
}

export interface IRequirementsForReglament {
  id?: number;
  codReglament?: number;
  active: boolean;
  mandatoryFor?: string;
  description: string;
}

export interface IReglamentMiniForValidRanges {
  id: number;
  idProgram: number;
  initialPeriodOrg: string;
  endPeriodOrg: string | null;
  initialPeriod: number;
  endPeriod: number | null;
}

export interface IValidDatesAndProgramReglament {
  idProgram: number;
  initialPeriod: string;
  isOpenPeriod: boolean;
  endPeriod: string | null;
}

export interface IReglamentConsolidationSave {

  id?: number;
  idProgram?: number;
  initialPeriod?: string;
  isOpenPeriod?: boolean;
  endPeriod?: string;
  applyTheoreticalSemiannualPercent?: boolean;
  theoreticalSemiannualPercent?: number;
  applyAcademicPerformancePercent?: boolean;
  academicPerformancePercent?: number;
  applyRequirementsPercent?: boolean;
  requirementsPercent?: number;
  applySocialService?: boolean;
  socialServicePercent?: number;
  socialServiceHours?: number;
  socialServiceCondonationType?: string;
  socialServiceCondonationPercent?: string;
  applyKnowledgeTransfer?: boolean;
  knowledgeTransferPercent?: number;
  knowledgeTransferHours?: number;
  knowledgeTransferCondonationType?: string;
  knowledgeTransferCondonationPercent?: string;
  applyGracePeriod?: boolean;
  gracePeriodMonths?: number;
  graceDateApplication?: string;
  applyContinuousSuspension?: boolean;
  continuosSuspencionQuantity?: number;
  applyDiscontinuousSuspension?: boolean;
  discontinuousSuspensionQuantity?: number;
  applySpecialSuspensions?: boolean;
  specialSuspensionsQuantity?: number;
  applyExtension?: boolean;
  extensionQuantity?: number;
  applyCondonationPerformancePeriod?: boolean;
  performancePeriodStructure?: string;
  applyAccomulatedIncomeCondonation?: boolean;
  accumulatedPerformanceDataTable?: string;
  modifyUser?: string;
  modifyDate?: Date;
  createUser?: string;
  createDate?: Date;

}
